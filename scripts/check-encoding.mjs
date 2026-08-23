import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'project-medi-matrix.html');
const content = fs.readFileSync(filePath, 'utf-8');

let hasError = false;

function check(condition, message) {
    if (!condition) {
        console.error(`❌ ERROR: ${message}`);
        hasError = true;
    }
}

// 1. Check for mojibake and encoding artifacts.
// Use an ASCII-safe Unicode escape so the guard itself cannot be damaged by editor encoding.
const replacementCharacter = '\uFFFD';
check(!content.includes(replacementCharacter), 'Found Unicode replacement character (U+FFFD) in HTML');
check(!content.includes('??/a>'), 'Found broken anchor marker (??/a>) in HTML');

// 2. Basic anchor integrity check.
const openingAnchors = (content.match(/<a\b/g) || []).length;
const closingAnchors = (content.match(/<\/a>/g) || []).length;
check(openingAnchors === closingAnchors, `Anchor count mismatch: ${openingAnchors} opening vs ${closingAnchors} closing`);

// 3. Check for required links.
check(content.includes('medi-matrix.vercel.app'), 'Missing medi-matrix.vercel.app link');
check(content.includes('github.com/YunhuPark/Medi-Matrix'), 'Missing GitHub repository link');
check(content.includes('golden-time.vercel.app'), 'Missing golden-time.vercel.app link');

// 4. Check specific Korean text as a UTF-8 integrity smoke test.
check(content.includes('의료 AI에서는 구현 범위를 정확히 말하는 것도 품질입니다.'), 'Missing or corrupted required Korean text');
check(content.includes('의료영상'), 'Missing or corrupted "의료영상"');
check(content.includes('생체신호'), 'Missing or corrupted "생체신호"');
check(content.includes('합성 데이터'), 'Missing or corrupted "합성 데이터"');

if (hasError) {
    console.error('Encoding or content checks FAILED.');
    process.exit(1);
}

console.log('✅ Encoding and content checks PASSED.');
