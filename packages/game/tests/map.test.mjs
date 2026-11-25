import assert from "node:assert/strict";
import { test } from "node:test";
import { URL } from "node:url";
import { readFileSync } from "node:fs";
import { loadMap } from "../src/index.ts";

const map = JSON.parse(readFileSync(new URL("../maps/test-1v1.json", import.meta.url), "utf8"));

test("loads the existing board with coordinates, resources and starting Keeps", () => {
  const board = loadMap(map);
  assert.equal(board.width, 12);
  assert.equal(board.height, 12);
  assert.deepEqual(board.tiles[9][2], {
    coordinate: { x: 2, y: 9 },
    terrain: "plains",
    startingKeep: 1,
  });
  assert.deepEqual(board.tiles[2][9], {
    coordinate: { x: 9, y: 2 },
    terrain: "plains",
    startingKeep: 2,
  });
  assert.deepEqual(board.tiles[5][1], {
    coordinate: { x: 1, y: 5 },
    terrain: "water",
  });
  assert.deepEqual(board.tiles[5][3], {
    coordinate: { x: 3, y: 5 },
    terrain: "plains",
    resource: "food",
  });
  assert.deepEqual(board.tiles[6][1], {
    coordinate: { x: 1, y: 6 },
    terrain: "water",
    resource: "food",
  });
  assert.equal(board.tiles[4][4].resource, "gold");
  assert.equal(board.tiles[0][8].resource, "wood");
  assert.equal(board.tiles[4][6].resource, "stone");
});

test("rejects malformed terrain and invalid starting Keeps", () => {
  const terrainWithMissingRow = ["12", "34"];
  delete terrainWithMissingRow[1];

  for (const input of [
    null,
    {},
    { terrain: [] },
    { terrain: [""] },
    { terrain: [1] },
    { terrain: terrainWithMissingRow },
    { terrain: ["1.", "2"] },
  ]) {
    assert.throws(() => loadMap(input));
  }
  for (const terrain of [["1?2"], ["11"], ["2"], ["1.3"], ["..."]]) {
    assert.throws(() => loadMap({ terrain }));
  }
  assert.throws(() => loadMap({ terrain: ["15"] }), /Unknown terrain/);
});

test("requires two or four starting Keeps", () => {
  assert.throws(() => loadMap({ terrain: ["1"] }), /two or four/);
  assert.throws(() => loadMap({ terrain: ["123"] }), /two or four/);

  const board = loadMap({ terrain: ["1234"] });
  assert.deepEqual(
    board.tiles[0].map(({ startingKeep }) => startingKeep),
    [1, 2, 3, 4],
  );
});
