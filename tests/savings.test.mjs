import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSavings } from '../src/lib/savings.ts';
const base = { tasks: 400, minutes: 8, hourly: 25, automated: 60, monthly: 200, setup: 2400 };
test('escenario didáctico: horas, valor y recuperación', () => { assert.deepEqual(calculateSavings(base), { hours: 32, gross: 800, net: 600, payback: 4 }); });
test('no promete recuperación cuando el costo supera el valor', () => { const result = calculateSavings({ ...base, monthly: 900 }); assert.equal(result.net, -100); assert.equal(result.payback, null); });
test('cero tareas y sin inversión inicial', () => { assert.equal(calculateSavings({ ...base, tasks: 0 }).hours, 0); assert.equal(calculateSavings({ ...base, setup: 0 }).payback, 0); });
test('rechaza porcentajes fuera de rango y valores no finitos', () => { for (const bad of [{ automated: 101 }, { minutes: -1 }, { hourly: NaN }, { tasks: Infinity }]) assert.equal(calculateSavings({ ...base, ...bad }), null); });
