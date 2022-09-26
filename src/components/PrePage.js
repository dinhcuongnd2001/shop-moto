import React, {useState, useContext} from 'react';
import { Button, Modal } from 'antd';
import {db, Auth} from '../firebase/config';
import { FacebookAuthProvider,signInWithPopup , GoogleAuthProvider,  getAdditionalUserInfo } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; 
import {addDocument, addOrder, readOrder} from '../firebase/services'
import {dataContext} from '../context/DataProvider'

function PrePage() {
    // console.log('Prepage');
    const {setOrders, setQuantity} = useContext(dataContext);
    const [onModal, setOnModal] = useState(false);
    // Create an instance of the Facebook/Google provider object
    const fbProvider =  new FacebookAuthProvider();
    const GoogleProvider = new GoogleAuthProvider();

    const handleOk = () => {
        setOnModal(false);
    }
    const handleCancel = () => {
        setOnModal(false);
    }

// xu ly login vao he thong
    const handleLogin = (provider) => {
        signInWithPopup(Auth, provider)
            .then((result) => {
                const UserInfo = getAdditionalUserInfo(result);
                // console.log(info);
                const {user : {displayName, photoURL, email, uid}} = result ;
                if(UserInfo.isNewUser) {
                    const products = [];
                    addDocument('users', {displayName, photoURL, email, uid});
                    addOrder(uid, {products}) ;  
                }
                else{
                    // lay ra order theo ID khach hang
                    readOrder(uid)
                    .then(data => {
                        // console.log('dataL ', data);
                        setQuantity(data.products.length);
                        setOrders(data.products);
                    })
                }   
            })
            .catch((error) => {
                console.log(error.message)
            })

        setOnModal(false);
    }

    return (
        <div className='heading-prePage'>
            <div className='prePage'>
                <h1 className="titel">let's travel your interests in DNC SHOP</h1>
                <div className='login-btn'>
                    <Button
                        type='default'
                        onClick={() => setOnModal(true)}
                    >
                        Log In
                    </Button>

                    <Modal 
                        open={onModal}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Button
                            onClick={() => handleLogin(fbProvider)}
                            style={{width:'90%', margin:'5px'}}
                            type='default'
                        >
                            Login With FaceBook
                        </Button>

                        <Button
                            onClick={() => handleLogin(GoogleProvider)} 
                            style={{width:'90%', margin:'5px'}}
                            type='default'
                        >
                            Login With Google
                        </Button>
                    </Modal>
                </div>
            </div>

        </div>

    )
}

export default PrePage
