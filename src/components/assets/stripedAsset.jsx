function StripedTable(index,selected){
const obj={
    "background": index % 2 ? '#e0dcdc' : index === selected ? '#cd511f' :  'white',
    "color": index === selected ? 'white' : 'black'
}
    return obj
}



export default StripedTable