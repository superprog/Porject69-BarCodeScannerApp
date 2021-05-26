
import React from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import  * as  Permissions  from 'expo-permissions';
import  {BarCodeScanner} from 'expo-barcode-scanner';

export default  class ScanScreen  extends  React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermission:null,
            scanned:false,
            buttonState:'normal',
            scannedData:'',
            
        }
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA);
      
        this.setState({
            hasCameraPermission:status==='granted',
            buttonState:'clicked',
            scanned:false,
        })
    }
    handleBarCodeScanner=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        })
    }
    
    render(){
   
      
        const hasCameraPermission=this.state.hasCameraPermission;
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState;
        if(buttonState==="clicked" && hasCameraPermission){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ?undefined:this.handleBarCodeScanner}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState==='normal'){
            return(
                <View style={styles.Imagecontainer}>
                    <Image source={require('../assets/camera.jpg')} style={{width:100 ,height:100}}/>
             
     
                <View style={styles.container}>
                    <Text style={styles.displayText}>
                       
                  {hasCameraPermission===true ?
                    this.state.scannedData
                    :"Request Camera Permission"}  
                    </Text>
                    <TouchableOpacity style={styles.scanButton}
                    onPress={this.getCameraPermissions}>
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
                </View>
            )
           
        }

        
    }
   
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      
      },
      Imagecontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
      
      },
      displayText:{
          fontSize:15,
          textDecorationLine:'underline',
        

      },
      scanButton:{
            backgroundColor:'#65477f',
            padding:10,
            margin:10,     
      },
      buttonText:{
      fontSize:20, 
    }
})

