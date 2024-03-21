/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: FAROUK ALHASSAN Student ID: 133081224 Date: 02/15/2024
*
********************************************************************************/


const setData = require("../data/setData");
const themeData = require("../data/themeData");


let sets = [];


function initialize(){
    return new Promise((resolve, reject)=>{
        try{
            setData.forEach((set)=>{
                const theme = themeData.find((theme)=>theme.id === set.theme_id);
                const updatedSet = {...set };
                if(theme){
                    updatedSet.theme = theme.name;
                }
                else{
                    updatedSet.theme = 'unknown';
                }
        
                sets.push(updatedSet);
            });
            resolve();

        }
        catch(err){
            reject(err);

        }

    });

}


function getAllSets(){
    return new Promise((resolve, reject)=>{
        try{
            resolve(sets);
        }
        catch(err){
            reject(err)

        }
    });
}




function getSetByNum(setNum){

    return new Promise((resolve, reject)=>{
        try {
            foundSet = sets.find((set)=>set.set_num === setNum);
            if(foundSet){
                resolve(foundSet);
            }
            else{
                reject('unable to find requested set');
            }    
        }
        catch (err) {
            reject(err);
            
        }
    });
}



function getSetsByTheme(theme){

    return new Promise((resolve, reject)=>{
        try {
            newSet = sets.filter((set)=>set.theme.toLowerCase().includes(theme.toLowerCase()));
            if(newSet.length > 0){

                resolve(newSet);
            }
            else{
                reject('unable to find requested sets');
            }
        } catch (err) {
            reject(err);
            
        }
    });
}



module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };


//console.log(getAllSets());
//console.log(getSetByNum("001-1"));


//console.log(getSetsByTheme("TECH"))

//console.log(sets.length)