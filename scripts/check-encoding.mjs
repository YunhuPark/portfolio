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

// 1. Check for mojibake and encoding artifacts
check(!content.includes(''), 'Found replacement character () in HTML');
check(!content.includes('??/a>'), 'Found broken anchor (??/a>) in HTML');

// 2. Check for required links
check(content.includes('medi-matrix.vercel.app'), 'Missing medi-matrix.vercel.app link');
check(content.includes('github.com/YunhuPark/Medi-Matrix'), 'Missing GitHub repository link');
check(content.includes('golden-time.vercel.app'), 'Missing golden-time.vercel.app link');

// 3. Check for specific Korean text (UTF-8 integrity)
check(content.includes('의료 AI에서는 구현 범위를 정확히 말하는 것도 품질입니다.'), 'Missing or corrupted required Korean text');
check(content.includes('의료영상'), 'Missing or corrupted "의료영상"');
check(content.includes('생체신호'), 'Missing or corrupted "생체신호"');
check(content.includes('합성 데이터'), 'Missing or corrupted "합성 데이터"');

if (hasError) {
    console.error('Encoding or content checks FAILED.');
    process.exit(1);
} else {
    console.log('✅ Encoding and content checks PASSED.');
    process.exit(0);
}
