import { useState, useEffect } from "react";
import * as style from "@src/present/pages/Main/Main.style";
import Modal from "@common/Modal/Modal";
import FirstPage from "@component/Main/FirstPage";
import SecondPage from "@component/Main/SecondPage";
import ThirdPage from "@src/present/component/Main/ThirdPage";
import ModalContent from "@component/Main/Modalcontent";
import logo from "@assets/main/logo.png";
import right from "@assets/main/right.png";
import { GetWeather } from "@action/hooks/GetWeather";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClickButton = () => {
    setIsOpen(true);
    
  };
  const [lat, setLat] = useState<number>(36.110336);
  const [lng, setLng] = useState<number>(128.4112384);

  const getPosition = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  };

  const logWeather = () =>{
    getPosition();
    GetWeather(lat, lng).then((res) => {
      console.log(res.result);
      
    });
  }

  useEffect(()=>{
    const token = Cookies.get('AuthorizationToken');
    // token 값이 존재하면 accessToken에 할당하고, 그렇지 않으면 빈 문자열 할당
    console.log(token);
    const accessToken = token || '';
    console.log(accessToken)
    if(accessToken){
      navigate("/upload")
    }else{
      navigate("/")
      window.alert("구글 실패!")
    }
  }, [])

  return (
    <style.MainWrapper>
      <style.TopBox>
        <style.Logo src={logo} onClick={logWeather}></style.Logo>
        <style.LoginButton onClick={onClickButton}>
          <style.LogoText>로그인 하기</style.LogoText>
          <style.LogoRight src={right}></style.LogoRight>
        </style.LoginButton>
        {isOpen && (
          <Modal
            onClose={() => {
              setIsOpen(false);
            }}
            width="40vw"
            height="55vh"
            title="로그인"
            content={<ModalContent />}
          />
        )}
      </style.TopBox>
      <FirstPage />
      <SecondPage />
      <ThirdPage/>
    </style.MainWrapper>
  );
};

export default Main;
