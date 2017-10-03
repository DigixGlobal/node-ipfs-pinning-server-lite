export default function log(...params) {
  process.stdout.write(`<${new Date().toISOString()}> ${params.join(' ')}\n`);
}
