import dayjs from "dayjs";

const filterData = (data: any, eventsCount: number) => {
    console.log(`runninng filter data`);
    const dataArr = [];
    console.log(`dataArr.length = ${dataArr.length}`);
    

    for(let i = 0; i < eventsCount; i++){
            

    }
}

const setDateRange = (): string[] => {
    const dateArr: string[] = [];
    console.log(`RUNNING setDateRange`);
    const startDate = dayjs().format("YYYY-MM-DDTHH:mm:ssZ ");
    //console.log(`start Date = ${startDate}`);
    dateArr.push(startDate);

    const endDate = dayjs().add(16, "day").format("YYYY-MM-DDTHH:mm:ssZ ");
    //console.log(`endDate = ${endDate}`);
    dateArr.push(endDate);

    return dateArr;
    
}

export  { filterData, setDateRange };