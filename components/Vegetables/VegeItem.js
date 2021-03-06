import React, { useState, useEffect } from 'react';
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import { List,ListItemText} from 'react-native-paper';
import DialogContent from '../DialogContent/DialogContent'
const {getImage} = require('../../DAL/DAL');


const cart =[];
const VegeItem = ({plant_details})=>{
  const [quantity, setQuantity] = useState(0);

  const [orderCart, setOrderCart] = useState([]);
  const [visible, setVisible] = useState(false);
  const doShowDialog = () => setVisible(!visible); 

  const addItems = (plantToAdd)=>{
      const updatedCart = [...orderCart];
      setQuantity(prevCount => prevCount + 1 );
      updatedCart.push({
        qty: quantity,
        plant: plantToAdd,
      });
      setOrderCart(updatedCart);
      cart.push(updatedCart);
    }
  const removeItems = (plantToAdd)=>{ 
    const updatedCart = [...orderCart];
    quantity > 0 ? setQuantity(prevCount => prevCount - 1 ) : setQuantity(0);
    updatedCart.pop();
    setOrderCart(updatedCart);
    // cart.pop(updatedCart);
  }
  
  useEffect(() => {
  }, [quantity])

  return(   
    <>
      <View style={styles.vegeItem} key={plant_details.id}>        
        <TouchableOpacity style={styles.imgTitle} onPress={()=>doShowDialog()}>          
          <Image style={styles.tinyImage} source={{uri: `${getImage(plant_details.imageId)}`,}}/>
          <Text style={styles.vegeTitle}>{plant_details.name}</Text>
        </TouchableOpacity>
        <View style={styles.quantityControls}>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={()=>updateItemQuantity(item.id , item.quantity)}><Text style={styles.controlsBtns}> - </Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>addItem(plant_details)}><Text style={styles.controlsBtns}> + </Text></TouchableOpacity>
        </View>
        <Portal>        
          <Dialog visible={visible} onDismiss={doShowDialog} style={styles.dialog}>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
            <Dialog.Title>{plant_details.name}</Dialog.Title>
            <DialogContent plantDetails={plant_details} key={plant_details.id}/>       
            <Dialog.Actions>
              <Button onPress={doShowDialog} key={plant_details.id+11}>Done</Button>
            </Dialog.Actions>
          </ScrollView>
          </Dialog>          
        </Portal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
   scrollView: {
    marginLeft: 1,
    marginRight: 1,
    flex: 1,
  }, 
  ntfText:{
    fontSize: 12,
    justifyContent: "flex-start",
    alignItems:'flex-start',
  },
  ntfTitle:{
    fontSize: 12,
    height:50,
    justifyContent: "flex-start",
    alignItems:'flex-start',
    backgroundColor:'#F0FFF6',
  },
  dialogText:{
    fontSize: 15,
    fontWeight: 'bold'
  },
  dialog:{
    top:15,
    flex: 1,
  },
  quantityControls:{
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  quantityText:{
    fontSize: 20,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 10,
    paddingTop:5,
    paddingHorizontal: 15,
    borderColor: '#47AB48',
    marginVertical: 3,
  },
  controlsBtns:{
    fontSize: 30,
    paddingHorizontal: 5,
  },
  vegeItem: {
    backgroundColor: '#E3E9F3',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:1,
  },
  imgTitle:{
    width:'65%',
    flexDirection: 'row',
  },
  vegeTitle:{
    fontSize: 15,
    paddingVertical: 10,
  },
  tinyImage: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 5,
    borderColor: '#47AB48',
    borderWidth: 1,
  },
});

export default VegeItem;