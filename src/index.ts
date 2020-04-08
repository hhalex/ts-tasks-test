import {Task, Stream, TaskCombinator} from "pledge-ts";

const test: Task<any> = Task.timeout(5000)
    .map(() => console.log("timeout 5s"))
    .flatMap(() => test);

test.run(() => {});

const timeStream = Stream.interval(5000).map(() => performance.now());
/*
Stream.events("click", window)
    .merge(timeStream)
    .scan<[MouseEvent|undefined, number|undefined]>(
        (e, acc) => (e[0] ? [e[0], acc[1]]: [acc[0], e[1]]),
        [,,]
    )
    .start(e => e[0] && e[1] && console.log(`Click happened at ${e[0].x}x${e[0].y}, at ${e[1]}`));

*/
const raceTask = TaskCombinator.race(
    Task.raf(),
    Task.timeout(20)
);

const raf: (n: number) => Task<any> = n => n < 5000 
    ? raceTask.flatMap(n2 => { 
        //console.log(n2);
        const time = n2[0] ? n2[0] : performance.now();
        console.log(`${n2[0] ? "raf" : "timeout"} time: ${time} ms`);
        return raf(time);
    })
    : Task.timeout(500).map(() => console.log("Looping is over"));

raf(0).run(() => {});