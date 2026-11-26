import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { createBoardMatch, loadMap } from "../src/index.ts";

const setup = [{ id: "a" }, { id: "b" }];
const board = () =>
  loadMap(JSON.parse(readFileSync(new URL("../maps/test-1v1.json", import.meta.url))));

test("initializes the existing map deterministically without mutating inputs", () => {
  const map = board();
  const before = JSON.parse(JSON.stringify(map));
  const state = createBoardMatch(setup, map);
  assert.deepEqual(state, createBoardMatch(setup, map));
  assert.deepEqual(map, before);
  assert.deepEqual(state.resources.a, { food: 2, wood: 2, stone: 0, gold: 0 });
  for (const [i, player] of setup.entries()) {
    const keep = state.buildings[i];
    const worker = state.units[i * 2];
    const infantry = state.units[i * 2 + 1];
    assert.equal(keep.ownerId, player.id);
    assert.equal(keep.hp, 3);
    assert.equal(map.tiles[keep.position.y][keep.position.x].startingKeep, i + 1);
    assert.deepEqual(worker, {
      id: `worker-${i + 1}`,
      type: "worker",
      ownerId: player.id,
      position: keep.position,
      hp: 1,
    });
    assert.equal(infantry.ownerId, player.id);
    assert.equal(infantry.hp, 3);
    assert.equal(
      Math.abs(infantry.position.x - keep.position.x) +
        Math.abs(infantry.position.y - keep.position.y),
      1,
    );
    assert.notEqual(map.tiles[infantry.position.y][infantry.position.x].terrain, "water");
    assert.notEqual(map.tiles[infantry.position.y][infantry.position.x].terrain, "mountain");
  }
});

test("uses setup order for four Keeps in team and free-for-all games", () => {
  const map = loadMap({ terrain: ["1...2", ".....", ".....", ".....", "3...4"] });
  for (const players of [
    [
      { id: "a", teamId: "x" },
      { id: "b", teamId: "x" },
      { id: "c", teamId: "y" },
      { id: "d", teamId: "y" },
    ],
    [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }],
  ]) {
    const state = createBoardMatch(players, map);
    assert.deepEqual(
      state.buildings.map((keep) => keep.ownerId),
      ["a", "b", "c", "d"],
    );
    assert.equal(
      new Set(
        state.units
          .filter((unit) => unit.type === "infantry")
          .map((unit) => JSON.stringify(unit.position)),
      ).size,
      4,
    );
  }
});

test("rejects mismatched, malformed and impossible starting layouts", () => {
  assert.throws(
    () => createBoardMatch(setup, loadMap({ terrain: ["1...2", ".....", "3...4"] })),
    /Keep/i,
  );
  const duplicate = board();
  duplicate.tiles[0][0].startingKeep = 1;
  assert.throws(() => createBoardMatch(setup, duplicate), /Keep/i);
  assert.throws(() => createBoardMatch(setup, loadMap({ terrain: ["1~2"] })), /placement/i);
});

test("symmetric starts use rotationally symmetric infantry positions", () => {
  const map = loadMap({ terrain: ["1....", ".....", ".....", ".....", "....2"] });
  const state = createBoardMatch(setup, map);
  const [a, b] = state.units.filter((unit) => unit.type === "infantry");
  assert.deepEqual(b.position, { x: 4 - a.position.x, y: 4 - a.position.y });
});

test("placement backtracks when a shared tile is the only option for another player", () => {
  const map = loadMap({ terrain: ["1.2", ".~~"] });
  const state = createBoardMatch(setup, map);
  assert.deepEqual(state.units[1].position, { x: 0, y: 1 });
  assert.deepEqual(state.units[3].position, { x: 1, y: 0 });
});
