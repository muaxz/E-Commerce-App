export const calculatedate = (previousdate : string) : {time:number,express:string} | void=>{

    const currentTime : any = new Date();
    const Prevdate : any = new Date(previousdate); 
    Prevdate.setMinutes(Prevdate.getMinutes()+Prevdate.getTimezoneOffset())
    currentTime.setMinutes(currentTime.getMinutes()+currentTime.getTimezoneOffset())
    const difference = Math.abs(currentTime-Prevdate);
    const second=Math.ceil(difference/1000);

    if(second<60){
       return {time:second,express:"seconds"}
     }
     else if(second>60 && second<3600){

       return {time:Math.ceil(second/60),express:"minutes"}
     }
     else if(second>3600 && second<86400){

        return {time:Math.ceil(second/(60*60)),express:"hours"}
     }
     else if(second>86400 && second<262974383){

       return {time:Math.ceil(second/(60*60*24)),express:"days"}

     }

}