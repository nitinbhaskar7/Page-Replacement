import { LinkedHashSet } from "./LinkedHashMaps"

export function lru(refArr , frames) {
    const map = new LinkedHashSet();
    let hits = 0;
    let faults = 0;
    // At each instance we need a snapshot of the current state of the frames
    let snapshot = [];

    // each index contains : {
    //     hits : 0,
    //     faults : 0,
    //     frames : [1 , - , - ] // if not filled then -
    for (let i = 0; i < refArr.length; i++) {
    let faultIdx = -1 ;

        if(map.contains(refArr[i])){
            hits++;
            map.remove(refArr[i]);
            map.add(refArr[i]);
            const fra = map.elements() ;

            for(let i = map.size(); i < frames; i++){
                fra.push('-');
            }
            snapshot.push({
                hits,
                faults,
                faultIdx,
                frames : fra
            })
            continue ;
        }
        if(map.size() === frames){
            map.deleteFirst();
        }
        map.add(refArr[i]);
        faults++;
        faultIdx = map.elements().findIndex((el) => el === refArr[i]);

        // push - to represent empty frames
        const fra = map.elements() ;

        for(let i = map.size(); i < frames; i++){
            fra.push('-');
        }
        // snapshot
        snapshot.push({
            hits,
            faults,
            faultIdx,
            frames : fra
        })

    }

    return snapshot;

}