import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeLegalMap, getReadinessChecklist, BATAS_AKHIR_WAJIB_HALAL_UMK } from './rules.ts';
import { UserProfile } from '../types.ts';

test('Skenario 1: Kemplang rumahan belum punya apa-apa', () => {
  const profile: UserProfile = {
    productType: 'makanan_kering',
    regency: 'bangka',
    scale: 'mikro',
    productionPlace: 'rumah',
    hasNIB: 'belum',
    hasPIRT: 'belum',
    hasHalal: 'belum',
    hasAnimalIngredients: 'ya', // ikan tenggiri
    hasAdditives: 'tidak',
    productCount: '1_5'
  };

  const result = analyzeLegalMap(profile);

  // Must not be non-food
  assert.equal(result.isNonFood, false);
  assert.equal(result.deadlineHalal, BATAS_AKHIR_WAJIB_HALAL_UMK);

  // Check licenses
  const nib = result.licenses.find(l => l.id === 'NIB');
  const pirt = result.licenses.find(l => l.id === 'PIRT');
  const halal = result.licenses.find(l => l.id === 'HALAL');

  assert.ok(nib, 'NIB should exist');
  assert.equal(nib?.status, 'wajib', 'NIB must be wajib as first step');

  assert.ok(pirt, 'PIRT should exist');
  assert.equal(pirt?.status, 'dibutuhkan', 'PIRT is needed for kemplang kering');

  assert.ok(halal, 'Halal should exist');
  assert.equal(result.halalPath, 'self_declare', 'Eligible for self-declare with P3H guidance');

  // Verify readiness checks has both mandatory prerequisites and can-follow-up items
  const readiness = getReadinessChecklist(profile);
  const mandatory = readiness.filter(r => r.isMandatoryPrerequisite);
  const followUp = readiness.filter(r => !r.isMandatoryPrerequisite);

  assert.ok(mandatory.length >= 2, 'Should have mandatory prerequisites (NIB, KTP, etc.)');
  assert.ok(followUp.length >= 1, 'Should have follow-up items (e.g. sarana 3 bulan)');
});

test('Skenario 2: Sudah punya NIB dan PIRT, varian > 10 diarahkan ke jalur reguler', () => {
  const profile: UserProfile = {
    productType: 'makanan_kering',
    regency: 'belitung',
    scale: 'kecil',
    productionPlace: 'rumah',
    hasNIB: 'ya',
    hasPIRT: 'ya',
    hasHalal: 'belum',
    hasAnimalIngredients: 'ya',
    hasAdditives: 'ya',
    productCount: 'lebih_dari_10'
  };

  const result = analyzeLegalMap(profile);

  const nib = result.licenses.find(l => l.id === 'NIB');
  const pirt = result.licenses.find(l => l.id === 'PIRT');
  const halal = result.licenses.find(l => l.id === 'HALAL');

  assert.equal(nib?.status, 'sudah_ada');
  assert.equal(pirt?.status, 'sudah_ada');
  assert.equal(result.halalPath, 'reguler', 'Over 10 variants should trigger reguler pathway recommendation');
  assert.equal(halal?.status, 'perlu_reguler');
});

test('Skenario 3: Kerajinan tenun (non-pangan) hanya butuh NIB', () => {
  const profile: UserProfile = {
    productType: 'non_pangan',
    regency: 'pangkalpinang',
    scale: 'mikro',
    productionPlace: 'rumah',
    hasNIB: 'belum',
    hasPIRT: 'belum',
    hasHalal: 'belum',
    hasAnimalIngredients: 'tidak',
    hasAdditives: 'tidak',
    productCount: '1_5'
  };

  const result = analyzeLegalMap(profile);

  assert.equal(result.isNonFood, true);
  assert.ok(result.notes.some(n => n.includes('jalur non-pangan belum tersedia di versi ini') || n.includes('Jalur non-pangan belum tersedia di versi ini')));

  const nib = result.licenses.find(l => l.id === 'NIB');
  const pirt = result.licenses.find(l => l.id === 'PIRT');
  const halal = result.licenses.find(l => l.id === 'HALAL');

  assert.equal(nib?.status, 'wajib');
  assert.equal(pirt?.status, 'tidak_perlu');
  assert.equal(halal?.status, 'tidak_perlu');
});
