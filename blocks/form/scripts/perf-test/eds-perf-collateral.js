// ─── PRIVATE HELPER FUNCTIONS (not exported — internal computation) ────────────
// These are heavy helpers used by both EAGER (init) and LAZY (change) functions
// to simulate realistic computation cost.

function _computePrimes(limit) {
  const sieve = new Array(limit + 1).fill(true);
  sieve[0] = false; sieve[1] = false;
  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) sieve[j] = false;
    }
  }
  return sieve.reduce((acc, val, idx) => { if (val) acc.push(idx); return acc; }, []);
}

function _fibonacci(n) {
  if (n <= 1) return n;
  let a = 0; let b = 1;
  for (let i = 2; i <= n; i++) { const c = a + b; a = b; b = c; }
  return b;
}

function _luhnCheck(numStr) {
  const digits = String(numStr).replace(/\D/g, '').split('').map(Number);
  let sum = 0;
  digits.reverse().forEach((d, i) => {
    let n = i % 2 === 1 ? d * 2 : d;
    if (n > 9) n -= 9;
    sum += n;
  });
  return sum % 10 === 0;
}

function _hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0;
  }
  return h.toString(16);
}

function _calculateAmortization(principal, annualRate, months) {
  const r = annualRate / 12 / 100;
  if (r === 0) return { emi: principal / months, totalInterest: 0, totalPayment: principal };
  const emi = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = emi * months;
  return { emi: Math.round(emi * 100) / 100, totalInterest: Math.round((totalPayment - principal) * 100) / 100, totalPayment: Math.round(totalPayment * 100) / 100 };
}

function _scoreCreditRisk(creditScore, annualIncome, debtToIncomeRatio) {
  let baseScore = 0;
  if (creditScore >= 750) baseScore += 40;
  else if (creditScore >= 700) baseScore += 30;
  else if (creditScore >= 650) baseScore += 20;
  else baseScore += 5;
  if (annualIncome >= 100000) baseScore += 30;
  else if (annualIncome >= 60000) baseScore += 20;
  else if (annualIncome >= 30000) baseScore += 10;
  if (debtToIncomeRatio < 0.2) baseScore += 30;
  else if (debtToIncomeRatio < 0.36) baseScore += 20;
  else if (debtToIncomeRatio < 0.5) baseScore += 10;
  return Math.min(100, baseScore);
}

function _geoDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function _normalizePhone(raw) {
  const digits = String(raw).replace(/\D/g, '');
  if (digits.length === 10) return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (digits.length === 11 && digits[0] === '1') return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return raw;
}

function _validateIBAN(iban) {
  const cleaned = iban.replace(/\s/g, '').toUpperCase();
  if (cleaned.length < 5) return false;
  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  const numeric = rearranged.split('').map((c) => {
    const code = c.charCodeAt(0);
    return code >= 65 && code <= 90 ? (code - 55).toString() : c;
  }).join('');
  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    remainder = (remainder * 10 + parseInt(numeric[i], 10)) % 97;
  }
  return remainder === 1;
}

function _weightedAverage(values, weights) {
  let sumVW = 0; let sumW = 0;
  for (let i = 0; i < values.length; i++) { sumVW += values[i] * weights[i]; sumW += weights[i]; }
  return sumW === 0 ? 0 : sumVW / sumW;
}

function _percentile(sortedArr, p) {
  if (!sortedArr.length) return 0;
  const idx = (p / 100) * (sortedArr.length - 1);
  const lo = Math.floor(idx); const hi = Math.ceil(idx);
  return sortedArr[lo] + (sortedArr[hi] - sortedArr[lo]) * (idx - lo);
}

function _exponentialMovingAverage(values, alpha) {
  if (!values.length) return [];
  const ema = [values[0]];
  for (let i = 1; i < values.length; i++) {
    ema.push(alpha * values[i] + (1 - alpha) * ema[i - 1]);
  }
  return ema;
}

function _tokenize(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function _levenshtein(a, b) {
  const m = a.length; const n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (__, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function _deepMerge(target, source) {
  const out = Object.assign({}, target);
  if (typeof source === 'object' && source !== null) {
    Object.keys(source).forEach((k) => {
      if (typeof source[k] === 'object' && source[k] !== null && !Array.isArray(source[k])) {
        out[k] = _deepMerge(out[k] || {}, source[k]);
      } else {
        out[k] = source[k];
      }
    });
  }
  return out;
}

// ─── EAGER FUNCTIONS — called at panel initialization (blocking, init-time) ───
// EAGER = the form runtime must parse + execute these before rendering step 1.
// Large eager surface = slower Time-to-Interactive.

/**
 * Eager: builds an in-memory lookup table of primes at form init.
 * EAGER — called from panel initialize event.
 * @name eagerPreloadLookupTable Eager Preload Lookup Table
 * @param {scope} globals
 */
function eagerPreloadLookupTable(globals) {
  const primes = _computePrimes(1000);
  const table = {};
  primes.forEach((p, i) => { table[i] = p; });
  console.log('[perf:eager] lookup table built, entries:', Object.keys(table).length);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0009, { value: primes.length });
}

/**
 * Eager: computes initial credit risk score from hardcoded defaults.
 * EAGER — called from panel initialize event.
 * @name eagerComputeInitialRiskScore Eager Compute Initial Risk Score
 * @param {scope} globals
 */
function eagerComputeInitialRiskScore(globals) {
  const score = _scoreCreditRisk(720, 75000, 0.28);
  console.log('[perf:eager] initial risk score:', score);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0001, { value: score });
}

/**
 * Eager: validates user session hash at form init.
 * EAGER — called from panel initialize event.
 * @name eagerValidateUserSession Eager Validate User Session
 * @param {scope} globals
 */
function eagerValidateUserSession(globals) {
  const sessionId = 'sess_' + Date.now().toString(36);
  const hash = _hashString(sessionId);
  console.log('[perf:eager] session hash:', hash);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0006, { value: 'Session: ' + hash.slice(0, 8) });
}

/**
 * Eager: pre-fills geo distance between two hardcoded coordinates.
 * EAGER — called from panel initialize event.
 * @name eagerPrefillGeolocation Eager Prefill Geolocation
 * @param {scope} globals
 */
function eagerPrefillGeolocation(globals) {
  const dist = _geoDistanceKm(37.7749, -122.4194, 34.0522, -118.2437);
  console.log('[perf:eager] geo distance SF→LA:', dist.toFixed(1), 'km');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0007, { value: dist.toFixed(1) + ' km' });
}

/**
 * Eager: sets up analytics context by computing fibonacci seed.
 * EAGER — called from panel initialize event.
 * @name eagerInitAnalyticsContext Eager Init Analytics Context
 * @param {scope} globals
 */
function eagerInitAnalyticsContext(globals) {
  const seed = _fibonacci(25);
  console.log('[perf:eager] analytics seed (fib25):', seed);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0017, { value: seed });
}

/**
 * Eager: loads a fake product catalog and computes weighted price average.
 * EAGER — called from panel initialize event.
 * @name eagerLoadProductCatalog Eager Load Product Catalog
 * @param {scope} globals
 */
function eagerLoadProductCatalog(globals) {
  const prices = [299, 499, 999, 1499, 2999, 4999];
  const weights = [5, 4, 3, 2, 1, 0.5];
  const avg = _weightedAverage(prices, weights);
  console.log('[perf:eager] catalog weighted avg price:', avg.toFixed(2));
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0008, { value: 'Avg: $' + avg.toFixed(2) });
}

/**
 * Eager: builds eligibility matrix using percentile of mock income data.
 * EAGER — called from panel initialize event.
 * @name eagerComputeEligibilityMatrix Eager Compute Eligibility Matrix
 * @param {scope} globals
 */
function eagerComputeEligibilityMatrix(globals) {
  const incomes = [25000, 35000, 45000, 55000, 75000, 95000, 120000, 160000].sort((a, b) => a - b);
  const p75 = _percentile(incomes, 75);
  console.log('[perf:eager] income p75 threshold:', p75);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0014, { value: 'P75: ' + p75 });
}

/**
 * Eager: seeds form with defaults using deep-merged config objects.
 * EAGER — called from panel initialize event.
 * @name eagerSeedFormWithDefaults Eager Seed Form With Defaults
 * @param {scope} globals
 */
function eagerSeedFormWithDefaults(globals) {
  const baseConfig = { region: 'US', currency: 'USD', lang: 'en' };
  const userConfig = { region: 'CA', theme: 'light', currency: 'CAD' };
  const merged = _deepMerge(baseConfig, userConfig);
  console.log('[perf:eager] merged config:', JSON.stringify(merged));
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0015, { value: merged.region });
}

/**
 * Eager: runs duplicate submission check via hash comparison.
 * EAGER — called from panel initialize event.
 * @name eagerRunDuplicateCheck Eager Run Duplicate Check
 * @param {scope} globals
 */
function eagerRunDuplicateCheck(globals) {
  const fingerprint = _hashString(navigator.userAgent + Date.now().toString(36).slice(-4));
  const isDuplicate = fingerprint.slice(0, 1) === '0';
  console.log('[perf:eager] duplicate check fingerprint:', fingerprint, 'isDup:', isDuplicate);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0016, { value: isDuplicate ? 'DUPLICATE' : 'UNIQUE' });
}

/**
 * Eager: initialises A/B test variant by computing a token bucket assignment.
 * EAGER — called from panel initialize event.
 * @name eagerInitABTestVariant Eager Init AB Test Variant
 * @param {scope} globals
 */
function eagerInitABTestVariant(globals) {
  const primes = _computePrimes(50);
  const variant = primes[Date.now() % primes.length] % 2 === 0 ? 'variant-A' : 'variant-B';
  console.log('[perf:eager] AB test variant:', variant);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0004, { visible: variant === 'variant-A' });
}

// ─── LAZY FUNCTIONS — called only on user interaction (change events) ─────────
// LAZY = only downloaded + executed when the user triggers a change.
// With eager/lazy splitting, this code can be deferred until needed.

/**
 * Lazy: recomputes loan amortization when principal (f0001) changes.
 * LAZY — triggered by f0001 value change event.
 * @name lazyOnF0001Changed Lazy On F0001 Changed
 * @param {scope} globals
 */
function lazyOnF0001Changed(globals) {
  const principal = globals.form.wizardStepsPanel.s1.f0001.$value || 0;
  const result = _calculateAmortization(principal, 8.5, 240);
  console.log('[perf:lazy] f0001 changed → EMI:', result.emi);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0009, { value: result.emi });
}

/**
 * Lazy: cascades dropdown options when loan type (f0002) changes.
 * LAZY — triggered by f0002 value change event.
 * @name lazyOnF0002Changed Lazy On F0002 Changed
 * @param {scope} globals
 */
function lazyOnF0002Changed(globals) {
  const loanType = globals.form.wizardStepsPanel.s1.f0002.$value;
  const hash = _hashString(String(loanType));
  console.log('[perf:lazy] f0002 changed to:', loanType, 'hash:', hash);
  const visible = parseInt(hash.slice(0, 2), 16) % 2 === 0;
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0003, { visible });
}

/**
 * Lazy: toggles section visibility when radio group (f0003) changes.
 * LAZY — triggered by f0003 value change event.
 * @MANUAL_LAZY
 * @name lazyOnF0003Changed Lazy On F0003 Changed
 * @param {scope} globals
 */
export function lazyOnF0003Changed(globals) {
  const selected = globals.form.wizardStepsPanel.s1.f0003.$value;
  console.log('[perf:lazy] f0003 changed to:', selected);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0004, { visible: selected === 'option1' });
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0005, { visible: selected === 'option2' });
}

/**
 * Lazy: validates text input for special keyword match using Levenshtein distance.
 * LAZY — triggered when f0006 equals "adf".
 * @name lazyOnF0006Equals Lazy On F0006 Equals
 * @param {scope} globals
 */
function lazyOnF0006Equals(globals) {
  const val = globals.form.wizardStepsPanel.s1.f0006.$value || '';
  const dist = _levenshtein(val.toLowerCase(), 'adobe');
  console.log('[perf:lazy] f0006 equals trigger — levenshtein to "adobe":', dist);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0007, { value: dist === 0 ? 'Match!' : 'Distance: ' + dist });
}

/**
 * Lazy: recomputes EMI when interest rate field (f0009) changes.
 * LAZY — triggered by f0009 value change event.
 * @name lazyOnF0009Changed Lazy On F0009 Changed
 * @param {scope} globals
 */
function lazyOnF0009Changed(globals) {
  const rate = globals.form.wizardStepsPanel.s1.f0009.$value || 8.5;
  const result = _calculateAmortization(500000, rate, 180);
  console.log('[perf:lazy] f0009 changed → EMI at', rate, '%:', result.emi);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0001, { value: result.emi });
}

/**
 * Lazy: loads sub-options based on dropdown (f0010) selection.
 * LAZY — triggered by f0010 value change event.
 * @name lazyOnF0010Changed Lazy On F0010 Changed
 * @param {scope} globals
 */
function lazyOnF0010Changed(globals) {
  const selection = globals.form.wizardStepsPanel.s1.f0010.$value;
  const tokens = _tokenize(String(selection) + ' option cascade filter');
  console.log('[perf:lazy] f0010 changed, tokens:', tokens);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0011, { visible: tokens.length > 2 });
}

/**
 * Lazy: computes applicant age from numeric field (f0017) and validates eligibility.
 * LAZY — triggered by f0017 value change event.
 * @name lazyOnF0017Changed Lazy On F0017 Changed
 * @param {scope} globals
 */
function lazyOnF0017Changed(globals) {
  const income = globals.form.wizardStepsPanel.s1.p1_l2.f0017.$value || 0;
  const score = _scoreCreditRisk(680, income, 0.32);
  console.log('[perf:lazy] f0017 changed → risk score:', score);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0018, { visible: score > 60 });
}

/**
 * Lazy: performs currency conversion when currency selector (f0018) changes.
 * LAZY — triggered by f0018 value change event.
 * @name lazyOnF0018Changed Lazy On F0018 Changed
 * @param {scope} globals
 */
function lazyOnF0018Changed(globals) {
  const currency = globals.form.wizardStepsPanel.s1.p1_l2.f0018.$value;
  const rates = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.2, CAD: 1.36 };
  const rate = rates[currency] || 1;
  const ema = _exponentialMovingAverage([1, rate, rate * 1.01, rate * 0.99, rate], 0.3);
  console.log('[perf:lazy] f0018 currency:', currency, 'EMA tail:', ema[ema.length - 1].toFixed(4));
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0016, { value: 'Rate: ' + rate });
}

/**
 * Lazy: full EMI calculation triggered by any principal/rate/term change.
 * LAZY — called from multiple change rules.
 * @name lazyComputeLoanEMI Lazy Compute Loan EMI
 * @param {scope} globals
 */
function lazyComputeLoanEMI(globals) {
  const principal = globals.form.wizardStepsPanel.s1.f0001.$value || 100000;
  const rate = globals.form.wizardStepsPanel.s1.f0009.$value || 8.5;
  const result = _calculateAmortization(principal, rate, 240);
  console.log('[perf:lazy] EMI compute — principal:', principal, 'rate:', rate, 'EMI:', result.emi);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0008, { value: 'EMI: ' + result.emi });
}

/**
 * Lazy: checks income eligibility thresholds.
 * LAZY — triggered by income field change.
 * @name lazyCheckIncomeEligibility Lazy Check Income Eligibility
 * @param {scope} globals
 */
function lazyCheckIncomeEligibility(globals) {
  const income = globals.form.wizardStepsPanel.s1.p1_l2.f0017.$value || 0;
  const sorted = [25000, 35000, income, 75000, 100000].sort((a, b) => a - b);
  const p50 = _percentile(sorted, 50);
  const eligible = income >= p50;
  console.log('[perf:lazy] income eligibility — income:', income, 'p50:', p50, 'eligible:', eligible);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0019, { visible: eligible });
}

/**
 * Lazy: validates phone number format on change.
 * LAZY — triggered by phone field change.
 * @name lazyValidatePhoneFormat Lazy Validate Phone Format
 * @param {scope} globals
 */
function lazyValidatePhoneFormat(globals) {
  const raw = globals.form.wizardStepsPanel.s1.p1_l2.f0014.$value || '';
  const formatted = _normalizePhone(raw);
  const isValid = formatted !== raw && formatted.length > 8;
  console.log('[perf:lazy] phone:', raw, '→', formatted, 'valid:', isValid);
  if (isValid) globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0014, { value: formatted });
}

/**
 * Lazy: computes debt-to-income ratio from two fields.
 * LAZY — triggered by debt field change.
 * @name lazyComputeDebtRatio Lazy Compute Debt Ratio
 * @param {scope} globals
 */
function lazyComputeDebtRatio(globals) {
  const debt = globals.form.wizardStepsPanel.s1.f0009.$value || 0;
  const income = globals.form.wizardStepsPanel.s1.p1_l2.f0017.$value || 1;
  const ratio = debt / income;
  console.log('[perf:lazy] debt ratio:', ratio.toFixed(3));
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0020, { visible: ratio > 0.5 });
}

/**
 * Lazy: scores full application risk on change.
 * LAZY — triggered by any risk-related field change.
 * @name lazyScoreApplicationRisk Lazy Score Application Risk
 * @param {scope} globals
 */
function lazyScoreApplicationRisk(globals) {
  const creditScore = globals.form.wizardStepsPanel.s1.f0001.$value || 650;
  const income = globals.form.wizardStepsPanel.s1.p1_l2.f0017.$value || 50000;
  const debtRatio = (globals.form.wizardStepsPanel.s1.f0009.$value || 0) / Math.max(income, 1);
  const riskScore = _scoreCreditRisk(creditScore, income, debtRatio);
  console.log('[perf:lazy] application risk score:', riskScore);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0002, { visible: riskScore < 50 });
}

/**
 * Lazy: updates a progress indicator based on filled fields count.
 * LAZY — triggered by any field change.
 * @name lazyUpdateProgressIndicator Lazy Update Progress Indicator
 * @param {scope} globals
 */
function lazyUpdateProgressIndicator(globals) {
  const fields = [
    globals.form.wizardStepsPanel.s1.f0001.$value,
    globals.form.wizardStepsPanel.s1.f0006.$value,
    globals.form.wizardStepsPanel.s1.f0007.$value,
    globals.form.wizardStepsPanel.s1.f0008.$value,
  ];
  const filled = fields.filter((v) => v !== null && v !== undefined && v !== '').length;
  const pct = Math.round((filled / fields.length) * 100);
  console.log('[perf:lazy] progress:', pct, '%');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0009, { value: pct });
}

/**
 * Lazy: simulates an address lookup API call on postcode change.
 * LAZY — triggered by postcode field change.
 * @name lazyRunAddressLookup Lazy Run Address Lookup
 * @param {scope} globals
 */
function lazyRunAddressLookup(globals) {
  const postcode = globals.form.wizardStepsPanel.s1.p1_l2.f0015.$value || '';
  const hash = _hashString(postcode);
  const city = postcode.length >= 5 ? 'City-' + hash.slice(0, 4) : '';
  console.log('[perf:lazy] address lookup for:', postcode, '→ city:', city);
  if (city) globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0016, { value: city });
}

/**
 * Lazy: cascades dependent dropdowns in step 1.
 * LAZY — triggered by f0011 radio change.
 * @name lazyCascadeDropdowns Lazy Cascade Dropdowns
 * @param {scope} globals
 */
function lazyCascadeDropdowns(globals) {
  const category = globals.form.wizardStepsPanel.s1.f0011.$value;
  const tokens = _tokenize(String(category));
  const showExtra = tokens.some((t) => t.startsWith('pro') || t.startsWith('bus'));
  console.log('[perf:lazy] cascade dropdowns — category:', category, 'showExtra:', showExtra);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0018, { visible: showExtra });
}

/**
 * Lazy: validates IBAN field on change.
 * LAZY — triggered by IBAN field change.
 * @name lazyValidateIBANField Lazy Validate IBAN Field
 * @param {scope} globals
 */
function lazyValidateIBANField(globals) {
  const iban = globals.form.wizardStepsPanel.s1.p1_l2.f0016.$value || '';
  const valid = _validateIBAN(iban);
  console.log('[perf:lazy] IBAN valid:', valid, 'for:', iban);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0016, { valid });
}

/**
 * Lazy: computes net worth from assets minus liabilities on change.
 * LAZY — triggered by asset/liability field change.
 * @name lazyComputeNetWorth Lazy Compute Net Worth
 * @param {scope} globals
 */
function lazyComputeNetWorth(globals) {
  const assets = globals.form.wizardStepsPanel.s1.f0001.$value || 0;
  const liabilities = globals.form.wizardStepsPanel.s1.f0009.$value || 0;
  const netWorth = assets - liabilities;
  const primes = _computePrimes(100);
  const bucket = primes[Math.abs(netWorth) % primes.length] || 0;
  console.log('[perf:lazy] net worth:', netWorth, 'prime bucket:', bucket);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0008, { value: 'NW: ' + netWorth });
}

/**
 * Lazy: filters eligible products based on computed risk score.
 * LAZY — triggered by profile field changes.
 * @name lazyFilterEligibleProducts Lazy Filter Eligible Products
 * @param {scope} globals
 */
function lazyFilterEligibleProducts(globals) {
  const income = globals.form.wizardStepsPanel.s1.p1_l2.f0017.$value || 0;
  const score = _scoreCreditRisk(700, income, 0.3);
  const prods = ['Basic', 'Silver', 'Gold', 'Platinum', 'Elite'];
  const eligible = prods.slice(0, Math.ceil(score / 20));
  console.log('[perf:lazy] eligible products:', eligible);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0002, { visible: eligible.includes('Gold') });
}

/**
 * Lazy: toggles conditional fields when f0011 radio group changes.
 * LAZY — triggered by f0011 change.
 * @name lazyOnF0011Changed Lazy On F0011 Changed
 * @param {scope} globals
 */
function lazyOnF0011Changed(globals) {
  const val = globals.form.wizardStepsPanel.s1.f0011.$value;
  const fib = _fibonacci(20);
  const toggle = (parseInt(_hashString(String(val)), 16) % fib) % 2 === 0;
  console.log('[perf:lazy] f0011 changed:', val, 'toggle:', toggle);
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0013, { visible: toggle });
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.p1_l2.f0020, { visible: !toggle });
}

// ─── Step init functions (existing — EAGER, init-time) ───────────────────────

/**
 * Step 1 init: sets f0001 default value and logs.
 * @name initPerfS1F1 Init Perf S1 F1
 * @param {scope} globals
 */
function initPerfS1F1(globals) {
  console.log('[perf] s1 init F1 — setting f0001');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0001, { value: 100 });
}

/**
 * Step 1 init: hides f0003 (simulates conditional field suppression).
 * @name initPerfS1F2 Init Perf S1 F2
 * @param {scope} globals
 */
function initPerfS1F2(globals) {
  console.log('[perf] s1 init F2 — hiding f0003');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0003, { visible: false });
}

/**
 * Step 1 init: shows f0004 and sets its value.
 * @name initPerfS1F3 Init Perf S1 F3
 * @param {scope} globals
 */
function initPerfS1F3(globals) {
  console.log('[perf] s1 init F3 — showing f0004 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0004, { visible: true, value: true });
}

/**
 * Step 2 init: sets f0085 default value and logs.
 * @name initPerfS2F1 Init Perf S2 F1
 * @param {scope} globals
 */
function initPerfS2F1(globals) {
  console.log('[perf] s2 init F1 — setting f0085');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0085, { value: 'S2 Init' });
}

/**
 * Step 2 init: hides f0086 (simulates conditional suppression).
 * @name initPerfS2F2 Init Perf S2 F2
 * @param {scope} globals
 */
function initPerfS2F2(globals) {
  console.log('[perf] s2 init F2 — hiding f0086');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0086, { visible: false });
}

/**
 * Step 3 init: sets f0155 default value and logs.
 * @name initPerfS3F1 Init Perf S3 F1
 * @param {scope} globals
 */
function initPerfS3F1(globals) {
  console.log('[perf] s3 init F1 — setting f0155');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0155, { value: 'Step3' });
}

/**
 * Step 3 init: hides f0156.
 * @name initPerfS3F2 Init Perf S3 F2
 * @param {scope} globals
 */
function initPerfS3F2(globals) {
  console.log('[perf] s3 init F2 — hiding f0156');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0156, { visible: false });
}

/**
 * Step 3 init: shows f0157 and sets its value.
 * @name initPerfS3F3 Init Perf S3 F3
 * @param {scope} globals
 */
function initPerfS3F3(globals) {
  console.log('[perf] s3 init F3 — showing f0157 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0157, { visible: true, value: 157 });
}

/**
 * Step 4 init: sets f0239 default value and logs.
 * @name initPerfS4F1 Init Perf S4 F1
 * @param {scope} globals
 */
function initPerfS4F1(globals) {
  console.log('[perf] s4 init F1 — setting f0239');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0239, { value: 239 });
}

/**
 * Step 4 init: hides f0240.
 * @name initPerfS4F2 Init Perf S4 F2
 * @param {scope} globals
 */
function initPerfS4F2(globals) {
  console.log('[perf] s4 init F2 — hiding f0240');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0240, { visible: false });
}

/**
 * Step 5 init: sets f0469 default value and logs.
 * @name initPerfS5F1 Init Perf S5 F1
 * @param {scope} globals
 */
function initPerfS5F1(globals) {
  console.log('[perf] s5 init F1 — setting f0469');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0469, { value: 'S5 Init' });
}

/**
 * Step 5 init: hides f0470.
 * @name initPerfS5F2 Init Perf S5 F2
 * @param {scope} globals
 */
function initPerfS5F2(globals) {
  console.log('[perf] s5 init F2 — hiding f0470');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0470, { visible: false });
}

/**
 * Step 5 init: shows f0471 and sets its value.
 * @name initPerfS5F3 Init Perf S5 F3
 * @param {scope} globals
 */
function initPerfS5F3(globals) {
  console.log('[perf] s5 init F3 — showing f0471 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0471, { visible: true, value: 471 });
}

/**
 * Step 6 init: sets f0689 default value and logs.
 * @name initPerfS6F1 Init Perf S6 F1
 * @param {scope} globals
 */
function initPerfS6F1(globals) {
  console.log('[perf] s6 init F1 — setting f0689');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0689, { value: 'S6 loaded' });
}

/**
 * Step 6 init: hides f0690.
 * @name initPerfS6F2 Init Perf S6 F2
 * @param {scope} globals
 */
function initPerfS6F2(globals) {
  console.log('[perf] s6 init F2 — hiding f0690');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0690, { visible: false });
}

/**
 * Step 7 init: sets f0843 default value and logs.
 * @name initPerfS7F1 Init Perf S7 F1
 * @param {scope} globals
 */
function initPerfS7F1(globals) {
  console.log('[perf] s7 init F1 — setting f0843');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0843, { value: 'S7 init' });
}

/**
 * Step 7 init: hides f0844.
 * @name initPerfS7F2 Init Perf S7 F2
 * @param {scope} globals
 */
function initPerfS7F2(globals) {
  console.log('[perf] s7 init F2 — hiding f0844');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0844, { visible: false });
}

/**
 * Step 7 init: shows f0845 and sets its value.
 * @name initPerfS7F3 Init Perf S7 F3
 * @param {scope} globals
 */
function initPerfS7F3(globals) {
  console.log('[perf] s7 init F3 — showing f0845 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0845, { visible: true, value: 845 });
}

/**
 * Step 8 init: sets f1025 default value and logs.
 * @name initPerfS8F1 Init Perf S8 F1
 * @param {scope} globals
 */
function initPerfS8F1(globals) {
  console.log('[perf] s8 init F1 — setting f1025');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1025, { value: 'S8 ready' });
}

/**
 * Step 8 init: hides f1026.
 * @name initPerfS8F2 Init Perf S8 F2
 * @param {scope} globals
 */
function initPerfS8F2(globals) {
  console.log('[perf] s8 init F2 — hiding f1026');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1026, { visible: false });
}

// ─── Legacy init stubs (preserved) ───────────────────────────────────────────

/**
 * Simulates async API prefill — sets f0001 (number) after 300ms.
 * @name initPerfF0001 Init Perf F0001
 * @param {scope} globals
 */
function initPerfF0001(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0001, { value: 42000 });
  }, 300);
}

/**
 * Simulates async API prefill — sets f0005 (date) after 600ms.
 * @name initPerfF0005 Init Perf F0005
 * @param {scope} globals
 */
function initPerfF0005(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0005, { value: '2026-01-15' });
  }, 600);
}

/**
 * Simulates async API prefill — sets f0006 (text) after 900ms.
 * @name initPerfF0006 Init Perf F0006
 * @param {scope} globals
 */
function initPerfF0006(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0006, { value: 'Auto-filled Name' });
  }, 900);
}

/**
 * Simulates async API prefill — sets f0007 (text) after 1200ms.
 * @name initPerfF0007 Init Perf F0007
 * @param {scope} globals
 */
function initPerfF0007(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0007, { value: 'Auto-filled City' });
  }, 1200);
}

/**
 * Shows f0003 (radio-group) after 300ms — triggers CLS at t+300ms.
 * @name showPerfF0003 Show Perf F0003
 * @param {scope} globals
 */
function showPerfF0003(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0003, { visible: true });
  }, 300);
}

/**
 * Shows f0004 (checkbox) after 500ms — triggers CLS at t+500ms.
 * @name showPerfF0004 Show Perf F0004
 * @param {scope} globals
 */
function showPerfF0004(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0004, { visible: true });
  }, 500);
}

// ─── API simulations — set field value after delay ────────────────────────────

/**
 * Simulates API response: sets f0002 value after 300ms.
 * @name apiSetF0002_300ms API Set f0002 300ms
 * @param {scope} globals
 */
function apiSetF0002_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0002, { value: 300 });
  }, 300);
}

/**
 * Simulates API response: sets f0005 value after 200ms.
 * @name apiSetF0005_200ms API Set f0005 200ms
 * @param {scope} globals
 */
function apiSetF0005_200ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0005, { value: '2026-03-01' });
  }, 200);
}

/**
 * Simulates API response: sets f0008 value after 500ms.
 * @name apiSetF0008_500ms API Set f0008 500ms
 * @param {scope} globals
 */
function apiSetF0008_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0008, { value: 'API Result' });
  }, 500);
}

/**
 * Simulates API response: sets f0090 value after 400ms.
 * @name apiSetF0090_400ms API Set f0090 400ms
 * @param {scope} globals
 */
function apiSetF0090_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0090, { value: 400 });
  }, 400);
}

/**
 * Simulates API response: sets f0095 value after 250ms.
 * @name apiSetF0095_250ms API Set f0095 250ms
 * @param {scope} globals
 */
function apiSetF0095_250ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s2.p2_l2.f0095, { value: 'Prefilled' });
  }, 250);
}

/**
 * Simulates API response: sets f0160 value after 300ms.
 * @name apiSetF0160_300ms API Set f0160 300ms
 * @param {scope} globals
 */
function apiSetF0160_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0160, { value: 300 });
  }, 300);
}

/**
 * Simulates API response: sets f0165 value after 450ms.
 * @name apiSetF0165_450ms API Set f0165 450ms
 * @param {scope} globals
 */
function apiSetF0165_450ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0165, { value: '2026-06-15' });
  }, 450);
}

/**
 * Simulates API response: sets f0250 value after 300ms.
 * @name apiSetF0250_300ms API Set f0250 300ms
 * @param {scope} globals
 */
function apiSetF0250_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0250, { value: 300 });
  }, 300);
}

/**
 * Simulates API response: sets f0280 value after 500ms.
 * @name apiSetF0280_500ms API Set f0280 500ms
 * @param {scope} globals
 */
function apiSetF0280_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0280, { value: 'Result' });
  }, 500);
}

/**
 * Simulates API response: sets f0500 value after 200ms.
 * @name apiSetF0500_200ms API Set f0500 200ms
 * @param {scope} globals
 */
function apiSetF0500_200ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0500, { value: 200 });
  }, 200);
}

/**
 * Simulates API response: sets f0520 value after 400ms.
 * @name apiSetF0520_400ms API Set f0520 400ms
 * @param {scope} globals
 */
function apiSetF0520_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0520, { value: 'Data' });
  }, 400);
}

/**
 * Simulates API response: sets f0700 value after 300ms.
 * @name apiSetF0700_300ms API Set f0700 300ms
 * @param {scope} globals
 */
function apiSetF0700_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0700, { value: 700 });
  }, 300);
}

/**
 * Simulates API response: sets f0710 value after 500ms.
 * @name apiSetF0710_500ms API Set f0710 500ms
 * @param {scope} globals
 */
function apiSetF0710_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0710, { value: 'Loaded' });
  }, 500);
}

/**
 * Simulates API response: sets f0850 value after 400ms.
 * @name apiSetF0850_400ms API Set f0850 400ms
 * @param {scope} globals
 */
function apiSetF0850_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0850, { value: 850 });
  }, 400);
}

/**
 * Simulates API response: sets f0860 value after 300ms.
 * @name apiSetF0860_300ms API Set f0860 300ms
 * @param {scope} globals
 */
function apiSetF0860_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0860, { value: 'Response' });
  }, 300);
}

/**
 * Simulates API response: sets f1050 value after 200ms.
 * @name apiSetF1050_200ms API Set f1050 200ms
 * @param {scope} globals
 */
function apiSetF1050_200ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1050, { value: 1050 });
  }, 200);
}

/**
 * Simulates API response: sets f1060 value after 400ms.
 * @name apiSetF1060_400ms API Set f1060 400ms
 * @param {scope} globals
 */
function apiSetF1060_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1060, { value: 'Final' });
  }, 400);
}

// ─── Hide fields after delay ──────────────────────────────────────────────────

/**
 * Hides f0005 after 300ms post-initialisation.
 * @name hideF0005_300ms Hide f0005 300ms
 * @param {scope} globals
 */
function hideF0005_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0005, { visible: false });
  }, 300);
}

/**
 * Hides f0006 after 400ms post-initialisation.
 * @name hideF0006_400ms Hide f0006 400ms
 * @param {scope} globals
 */
function hideF0006_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0006, { visible: false });
  }, 400);
}

/**
 * Hides f0092 after 350ms post-initialisation.
 * @name hideF0092_350ms Hide f0092 350ms
 * @param {scope} globals
 */
function hideF0092_350ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0092, { visible: false });
  }, 350);
}

/**
 * Hides f0158 after 280ms post-initialisation.
 * @name hideF0158_280ms Hide f0158 280ms
 * @param {scope} globals
 */
function hideF0158_280ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0158, { visible: false });
  }, 280);
}

/**
 * Hides f0159 after 380ms post-initialisation.
 * @name hideF0159_380ms Hide f0159 380ms
 * @param {scope} globals
 */
function hideF0159_380ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0159, { visible: false });
  }, 380);
}

/**
 * Hides f0260 after 400ms post-initialisation.
 * @name hideF0260_400ms Hide f0260 400ms
 * @param {scope} globals
 */
function hideF0260_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0260, { visible: false });
  }, 400);
}

/**
 * Hides f0480 after 300ms post-initialisation.
 * @name hideF0480_300ms Hide f0480 300ms
 * @param {scope} globals
 */
function hideF0480_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0480, { visible: false });
  }, 300);
}

/**
 * Hides f0695 after 250ms post-initialisation.
 * @name hideF0695_250ms Hide f0695 250ms
 * @param {scope} globals
 */
function hideF0695_250ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0695, { visible: false });
  }, 250);
}

/**
 * Hides f0696 after 450ms post-initialisation.
 * @name hideF0696_450ms Hide f0696 450ms
 * @param {scope} globals
 */
function hideF0696_450ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0696, { visible: false });
  }, 450);
}

/**
 * Hides f0855 after 350ms post-initialisation.
 * @name hideF0855_350ms Hide f0855 350ms
 * @param {scope} globals
 */
function hideF0855_350ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0855, { visible: false });
  }, 350);
}

/**
 * Hides f1030 after 300ms post-initialisation.
 * @name hideF1030_300ms Hide f1030 300ms
 * @param {scope} globals
 */
function hideF1030_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1030, { visible: false });
  }, 300);
}

/**
 * Hides f1040 after 500ms post-initialisation.
 * @name hideF1040_500ms Hide f1040 500ms
 * @param {scope} globals
 */
function hideF1040_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1040, { visible: false });
  }, 500);
}

export {
  // ── EAGER: step init stubs (existing) ──
  initPerfS1F1, initPerfS1F2, initPerfS1F3,
  initPerfS2F1, initPerfS2F2,
  initPerfS3F1, initPerfS3F2, initPerfS3F3,
  initPerfS4F1, initPerfS4F2,
  initPerfS5F1, initPerfS5F2, initPerfS5F3,
  initPerfS6F1, initPerfS6F2,
  initPerfS7F1, initPerfS7F2, initPerfS7F3,
  initPerfS8F1, initPerfS8F2,
  // ── EAGER: legacy async stubs ──
  initPerfF0001, initPerfF0005, initPerfF0006, initPerfF0007,
  showPerfF0003, showPerfF0004,
  // ── EAGER: new computation-heavy init functions ──
  eagerPreloadLookupTable,
  eagerComputeInitialRiskScore,
  eagerValidateUserSession,
  eagerPrefillGeolocation,
  eagerInitAnalyticsContext,
  eagerLoadProductCatalog,
  eagerComputeEligibilityMatrix,
  eagerSeedFormWithDefaults,
  eagerRunDuplicateCheck,
  eagerInitABTestVariant,
  // ── EAGER: API simulations (async, init-time) ──
  apiSetF0002_300ms, apiSetF0005_200ms, apiSetF0008_500ms,
  apiSetF0090_400ms, apiSetF0095_250ms,
  apiSetF0160_300ms, apiSetF0165_450ms,
  apiSetF0250_300ms, apiSetF0280_500ms,
  apiSetF0500_200ms, apiSetF0520_400ms,
  apiSetF0700_300ms, apiSetF0710_500ms,
  apiSetF0850_400ms, apiSetF0860_300ms,
  apiSetF1050_200ms, apiSetF1060_400ms,
  // ── EAGER: hide after delay ──
  hideF0005_300ms, hideF0006_400ms,
  hideF0092_350ms,
  hideF0158_280ms, hideF0159_380ms,
  hideF0260_400ms,
  hideF0480_300ms,
  hideF0695_250ms, hideF0696_450ms,
  hideF0855_350ms,
  hideF1030_300ms, hideF1040_500ms,
  // ── LAZY: interaction-time functions (change events only) ──
  lazyOnF0001Changed,
  lazyOnF0002Changed,
  lazyOnF0006Equals,
  lazyOnF0009Changed,
  lazyOnF0010Changed,
  lazyOnF0017Changed,
  lazyOnF0018Changed,
  lazyComputeLoanEMI,
  lazyCheckIncomeEligibility,
  lazyValidatePhoneFormat,
  lazyComputeDebtRatio,
  lazyScoreApplicationRisk,
  lazyUpdateProgressIndicator,
  lazyRunAddressLookup,
  lazyCascadeDropdowns,
  lazyValidateIBANField,
  lazyComputeNetWorth,
  lazyFilterEligibleProducts,
  lazyOnF0011Changed,
};
