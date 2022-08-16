import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import { MainPage } from "./pages/MainPage";

import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { IconRing } from "@consta/uikit/IconRing";
import { Text } from '@consta/uikit/Text';
import { useNavigate } from 'react-router-dom';

import {
  Header,
  HeaderModule,
  HeaderMenu,
  HeaderButton,
  HeaderLogin,
  HeaderLogo
} from "@consta/uikit/Header";


function App() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  const handleLogin = () => {
    //setIsLogged(!isLogged); 
    navigate("/auth");
  };

  const menuItems = [
    {
      label: "Проекты",
      href: "#projects",
      active: true
    },
    {
      label: "Задачи",
      href: "#tasks"
    },
    {
      label: "Какой-то пункт",
      onClick: () => alert("Какой-то пункт")
    }
  ];

  return (
    <div className="App">
      <Theme preset={presetGpnDefault}>
        <Header
          className="myheader"
          leftSide={
            <>
              <HeaderModule>
                <HeaderLogo>
                  <Text as="p" size="l" weight="bold">
                    Logotype
                  </Text>
                </HeaderLogo>
              </HeaderModule>
              <HeaderModule indent="l">
                <HeaderMenu items={menuItems} />
              </HeaderModule>
            </>
          }
          rightSide={
            <>
              {/* <HeaderModule indent="s">
                              <HeaderButton iconLeft={IconChat} />
                            </HeaderModule> */}
              <HeaderModule indent="s">
                <HeaderButton iconLeft={IconRing} />
              </HeaderModule>
              <HeaderModule indent="s">
                <HeaderLogin
                  isLogged={isLogged}
                  personName="Вадим Матвеев"
                  personInfo="В другом офисе"
                  personStatus="available"
                  personAvatarUrl="https://www.pngarts.com/files/3/Cool-Avatar-Transparent-Image.png"
                  onClick={handleLogin}
                  className="Login"
                />
              </HeaderModule>
            </>
          }
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </Theme>
    </div>
  );
}

export default App;
