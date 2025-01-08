import pino from 'pino';
import build from 'pino-abstract-transport';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { fileURLToPath } from 'url';

// 現在のファイルのディレクトリを取得し、その1つ上のディレクトリを指定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.join(__dirname, '..'); // 1つ上のディレクトリ

// ログディレクトリの設定
const logDir = path.join(parentDir, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 日付に基づくログファイル名の生成
const getLogFileName = (): string => {
  const date = new Date();
  return path.join(logDir, `app-${format(date, 'yyyy-MM-dd')}.log`);
};

// 書き込みストリームの初期化
let currentLogFile = getLogFileName();
let logStream = fs.createWriteStream(currentLogFile, { flags: 'a' });

// 日付のチェックとストリームの更新
const checkDateAndRotate = (): void => {
  const newLogFile = getLogFileName();
  if (newLogFile !== currentLogFile) {
    logStream.end();
    currentLogFile = newLogFile;
    logStream = fs.createWriteStream(currentLogFile, { flags: 'a' });
  }
};

// ログ発生元のファイルパスと行番号を取得する関数
const getCallerInfo = (): string => {
  const originalFunc = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const err = new Error();
  const stack = err.stack as unknown as NodeJS.CallSite[];
  Error.prepareStackTrace = originalFunc;

  // スタックトレースの3番目の呼び出し元を取得
  const caller = stack[2];
  const fileName = caller.getFileName();
  const lineNumber = caller.getLineNumber();
  return `${fileName}:${lineNumber}`;
};

// Pinoロガーの定義
const transport = build(async function (source) {
  for await (const obj of source) {
    checkDateAndRotate();

    // 現在の日時をミリ秒単位で取得
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS');
    obj.time = timestamp; // `time` フィールドをカスタマイズ

    // ログ発生元の情報を追加
    const callerInfo = getCallerInfo();
    obj.caller = callerInfo;

    // フィールドの順序を調整
    const logMessage = JSON.stringify({
      time: obj.time,
      level: obj.level,
      pid: obj.pid,
      hostname: obj.hostname,
      msg: obj.msg,
    });

    logStream.write(logMessage + '\n');
  }
});

// Pinoロガーの作成
const logger = pino(transport);

export default logger;
