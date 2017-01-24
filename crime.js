const fs=require('fs');
var firstcri=[];
var secondcri=[];

var readLine=require('readline');
var rd=readLine.createInterface({
 input: fs.createReadStream('crimedata.csv'),
 output: process.stdout,
 terminal: false
});
rd.on('line',function(lines){
 // var data=line.split(",");
 // lines[i++]=data.toString()
 // splittedline=lines[i-1].split(",");
 var line=lines.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/ );

 // var typeindex=headings.indexOf("Primary Type");
 // var yearindex=headings.indexOf("Year");
 // var descriptionindex=headings.indexOf("Description");
 // var arrestindex=headings.indexOf("Arrest");
 var obj={};
 var count=1;
 var contain=-1;
 var contain1=-1;
 var Year=line[17];
 var Type=line[5];
 var Description=line[6];
 var Arrest=line[8];
 // if(Year.length!=4)
 // {
 //     Year=line[19];
 // }
 // console.log(yearindex);
 // console.log(Year);
 // console.log(i-1);
 for(var j = 0; j < firstcri.length; j++) {
 if(Year == firstcri[j].Year)
 {
 contain=j;
  }
 }
 if(Type=="THEFT"&&Description=="OVER $500")
 {
   if(contain>-1)
   {
     firstcri[contain].Over+=1;
   }
   else
   {
     obj["Year"]=Year;
     obj["Over"]=1;
     obj["Under"]=0;
     firstcri.push(obj);

   }
 }

 else if(Type=="THEFT"&&Description=="$500 AND UNDER")
 {
   if(contain>-1)
   {
     firstcri[contain].Under+=1;
   }
   else
   {
     obj["Year"]=Year;
     obj["Over"]=0;
     obj["Under"]=1;
     firstcri.push(obj);
   }

 }
 // jsonfile.writeFileSync(file1,firstcri);
 for(var j = 0; j < secondcri.length; j++) {
 if(Year == secondcri[j].Year)
 {
 contain1=j;
  }
 }
 if(Type=="ASSAULT"&&Arrest=="true")
 {
   if(contain1>-1)
   {
     secondcri[contain1].Arrested+=1;
   }
   else
   {
     obj["Year"]=Year;
     obj["Arrested"]=1;
     obj["NotArrested"]=0;
     secondcri.push(obj);

   }
 }

 else if(Type=="ASSAULT"&&Arrest=="false")
 {
   if(contain1>-1)
   {
     secondcri[contain1].NotArrested+=1;
   }
   else
   {
     obj["Year"]=Year;
     obj["Arrested"]=0;
     obj["NotArrested"]=1;
     secondcri.push(obj);
   }

 }


 // jsonfile.writeFileSync(file2,secondcri);
 // fs.writeFile("barchart.json",JSON.stringify(firstcri),'utf-8');
 // console.log(splittedline[typeindex);
 // if(lines[i].indexOf(typeindex)=="THEFT")
 // {
 // console.log(lines[i]);
 // }
});
rd.on('close',function(){
  fs.writeFileSync('barchart.json',JSON.stringify(firstcri));
  fs.writeFileSync('linechart.json',JSON.stringify(secondcri));
  console.log(firstcri);
  console.log(secondcri);
});
