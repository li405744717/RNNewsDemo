/**
 * Created by Lemon on 2017/1/4.
 */
import React, { Component, } from 'react'
import { View, ListView} from 'react-native'
import {RemoteService} from './../../base/utils/data_service'
import BasePage from './BasePage'
class ListPage extends BasePage {

    static propTypes = {}

    static defaultProps = {}

    constructor(props) {
      super(props)
      this.state = {
        closeSwipeout:false,
        isSwipeoutOpen:false,
        dataSource: [],
        method:"",
        startIndex:0,
        pageSize:15,
        curRows:0,
        totalRows:0
      }
    }

    componentWillMount() {

    }
    componentWillUnmount() {
        super.componentWillUnmount()
    }
    onRefresh=()=>{
      console.log('onRefresh')
      var param = {
        "startIndex":0,
        "pageSize":this.state.pageSize,
        "curRows":0,
        "totalRows":0
      }
      this.getContactData(this.state.method,param,2,true)
    }

    onLoadMore=()=>{
      console.log("onLoadMore,this.state.endLoadMore->",this.state.endLoadMore)
      //page.state.dataSource
      //this.hasMoreData()
      if(this.hasMoreData()){
        var param = {
          "startIndex":this.state.startIndex,
          "pageSize":this.state.pageSize,
          "curRows":this.state.curRows,
          "totalRows":this.state.totalRows
        }
        this.getContactData(this.state.method,param,1,true)
      }else if(!this.state.endLoadMore ){
        //endLoadMore :true:已经没有数据，刷新之前，不加载等多数据，false-还有数据可以加载
        console.log("已加载所有数据，显示加载完成")
        this.setState({
          showFooter:true,
          endLoadMore:true
        })
        //1秒后隐藏footer
        var timer = setTimeout(()=>{
          this.setState({
            showFooter:false,
          })
        },2000)
      }
    }

    onScroll=(e)=>{

    }
    setDataSource = (dataSource) => {
      var ds =  new ListView.DataSource({
        getRowData: (data, sectionID, rowID) => {
          return data[sectionID][rowID];
        },
        getSectionHeaderData: (data, sectionID) => {
          return data[sectionID];
        },
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
      })
      return ds.cloneWithRowsAndSections(dataSource)
    }
    getContactData(method,param,isLoadMore,noNeedLoading){
      //isLoadMore: 1-上拉加载更多，2-刷新
        var oDate = new Date().getTime()
        console.log('getContactData')
        this.setState({
          method:method+oDate,
          isLoadingMore:isLoadMore == 1 ? true : false,
          isRefreshing:isLoadMore == 2 ? true : false,
        })
        RemoteService.run(method,param,this,
            (data)=>{
                //回调成功
              this.setState({
                dataSource:isLoadMore == 1 ? this.state.dataSource.concat(data.body) : data.body,
                endLoadMore:false,
                isLoadingMore:false,
                isRefreshing:false,
                curRows:data.head.curRows,
                totalRows:data.head.totalRows,
                startIndex:isLoadMore != 2 ? this.state.startIndex + data.head.curRows : data.head.curRows
              })
              if(isLoadMore == 2) {
                //刷新数据，当数据不满页时，不会自动onLoadMore，这里手动调用
                console.log("手动调onLoadMore")
                this.onLoadMore()
              }
            }, (data)=>{//回调失败

            },(error)=>{
                //抛出异常
                // console.log(error)
            },noNeedLoading)
    }

    deleteContactData=(rowID)=>{
        console.log('delete:',rowID)
      var data = this.state.dataSource
      data.splice(rowID,1)
        this.setState({
            dataSource:data
        })
    }

    onSwipeoutOpen=()=>{
        // console.log('onSwipeoutOpen')
        this.setState({
            isSwipeoutOpen:true
        })
    }
    hasMoreData = () => {
      console.log("this.state.startIndex",this.state.startIndex,"this.state.curRows",this.state.curRows)
      return this.state.startIndex < this.state.totalRows
    }
    render() {
        return (
            <View>

            </View>
        )
    }
}

export default ListPage