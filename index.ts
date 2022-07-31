const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
    const wsProvider = new WsProvider('ws://127.0.0.1:9944');
    const api = await ApiPromise.create({ provider: wsProvider });
    api.query.system.events((events) => {
        console.log(`\n收到 ${events.length} 个事件:`);

        events.forEach((record) => {
            const { event, phase } = record;

            //打印事件来源
            console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
        });
    });
}

main().catch((error) => {
    console.error(error);
    process.exit(-1);
});