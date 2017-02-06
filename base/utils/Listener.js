/**
 * Created by Lemon on 2016/12/28.
 */
import commonTools from './commonTools'
BackAndroidListener=(navigator)=>{
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    let curTimestamp = new Date().getTime();
    if (this.extTimestamp !== undefined && curTimestamp - this.extTimestamp <= 1000) {
        return false;
    } else {
        commonTools.shortAlert('再按一次退出应用');
        this.extTimestamp = curTimestamp;
        return true;
    }
}

const Listener={
    'BackAndroidListener':BackAndroidListener,
}

export default Listener
