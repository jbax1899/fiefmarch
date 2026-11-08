import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createMatch, applyCommand } from '../src/index.ts';
import { useAction } from '../src/turns.ts';

const start = () => createMatch([{ id: 'a' }, { id: 'b' }]);

test('a match starts with three actions and a fixed player order', () => {
  const state = start();
  assert.equal(state.status, 'playing');
  assert.deepEqual(state.turn, {
    round: 1,
    order: ['a', 'b'],
    currentIndex: 0,
    actionsRemaining: 3,
  });
});

test('three accepted actions advance the turn; the next round follows both turns', () => {
  const original = start();
  const a1 = useAction(original, 'a');
  assert.equal(a1.ok, true);
  assert.equal(a1.state.turn.actionsRemaining, 2);
  assert.equal(original.turn.actionsRemaining, 3);
  const a2 = useAction(a1.state, 'a');
  const a3 = useAction(a2.state, 'a');
  assert.equal(a3.state.turn.currentIndex, 1);
  assert.equal(a3.state.turn.round, 1);
  assert.equal(a3.state.turn.actionsRemaining, 3);
  const b1 = useAction(a3.state, 'b');
  const b2 = useAction(b1.state, 'b');
  const b3 = useAction(b2.state, 'b');
  assert.equal(b3.state.turn.round, 2);
  assert.equal(b3.state.turn.currentIndex, 0);
  assert.equal(b3.state.turn.actionsRemaining, 3);
});

test('ending a turn forfeits unused actions', () => {
  const result = applyCommand(start(), 'a', { type: 'end-turn' });
  assert.equal(result.ok, true);
  assert.equal(result.state.turn.currentIndex, 1);
  assert.equal(result.state.turn.actionsRemaining, 3);
});

test('invalid requests leave the original state unchanged', () => {
  const state = start();
  const wrongPlayer = useAction(state, 'b');
  assert.equal(wrongPlayer.ok, false);
  assert.equal(wrongPlayer.state, state);
  const unknown = applyCommand(state, 'nobody', { type: 'resign' });
  assert.equal(unknown.ok, false);
  assert.equal(unknown.state, state);
  assert.equal(state.turn.currentIndex, 0);
});

test('a player may resign outside their turn and the last side wins', () => {
  const state = start();
  const result = applyCommand(state, 'b', { type: 'resign' });
  assert.equal(result.ok, true);
  assert.equal(result.state.status, 'finished');
  assert.equal(result.state.winnerTeamId, 'a');
  assert.equal(result.state.players[1].eliminated, true);
  assert.equal(state.players[1].eliminated, false);
  assert.equal(applyCommand(result.state, 'a', { type: 'end-turn' }).ok, false);
});

test('resigning on turn skips the eliminated player without changing order', () => {
  const state = createMatch([{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]);
  const resigned = applyCommand(state, 'a', { type: 'resign' });
  assert.equal(resigned.state.turn.order[resigned.state.turn.currentIndex], 'b');
  const b = applyCommand(resigned.state, 'b', { type: 'end-turn' });
  const c = applyCommand(b.state, 'c', { type: 'end-turn' });
  const d = applyCommand(c.state, 'd', { type: 'end-turn' });
  assert.equal(d.state.turn.round, 2);
  assert.equal(d.state.turn.order[d.state.turn.currentIndex], 'b');
  assert.deepEqual(d.state.turn.order, ['a', 'b', 'c', 'd']);
});

test('validates player setup and distinct sides', () => {
  assert.throws(() => createMatch([{ id: 'a' }]), /two or four/);
  assert.throws(() => createMatch([{ id: 'a' }, { id: 'a' }]), /unique/);
  assert.throws(() => createMatch([{ id: 'a', teamId: 'x' }, { id: 'b', teamId: 'x' }]), /opposing/);
});
