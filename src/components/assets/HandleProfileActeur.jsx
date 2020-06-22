const HandleProfileActeur=(idProfile)=>{
    switch(idProfile) {
        case 5:
            return 'Organisation'
        case 4:
            return 'DGRC'
        default:
           return ''
    } 

}

export default HandleProfileActeur ;