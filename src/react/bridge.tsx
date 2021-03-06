/* Import */
import { NavLink, Link, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './component/loading'
import ButtonBase from '@material-ui/core/ButtonBase'
import Axios from 'axios'
import openerIDB from './store/dexie-indexeddb'
import { Helmet } from 'react-helmet'
import OpenerAPI from 'opener-api'

/* Function */
const getIDBSetting:Function = async (name:string, defaultValue: boolean) => {
    let returnData:boolean;

    let fetchData:Promise<Boolean> = new Promise((resolve, reject) => {
        openerIDB.table("settings").where("title").equals(`${name}`).toArray((data:any):boolean => {
            resolve(true);
            return returnData = data[0].value;
        }).catch((err:any):boolean => {
            openerIDB.table("settings").put({
                title: `${name}`,
                value: false
            });
            resolve(true);
            return returnData = defaultValue;
        });
    });

    await fetchData;
    return returnData;
}

const setIDBSetting:Function = async (name:string, defaultValue: boolean) => {
    let returnData:boolean;

    let fetchData:Promise<Boolean> = new Promise((resolve, reject) => {
        openerIDB.table("settings").where("title").equals(`${name}`).toArray((data:any):boolean => {
            openerIDB.table("settings").put({
                title: `${name}`,
                value: !data[0].value
            });
            resolve(true);
            return returnData = !data[0].value;
        }).catch((err:any):boolean => {
            openerIDB.table("settings").put({
                title: `${name}`,
                value: false
            });
            resolve(true);
            return returnData = defaultValue;
        });
    });

    await fetchData;
    return returnData;
}

/* Bridge */
export { 
    NavLink, 
    Link, 
    Redirect, 
    Loadable, 
    Loading, 
    ButtonBase,
    Axios,
    openerIDB,
    Helmet,
    getIDBSetting,
    setIDBSetting,
    OpenerAPI
}