import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Menu from './components/Menu';
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from "react-router-dom"

import { darkTheme, lightTheme } from './utils/Theme';
import { useSelector } from "react-redux";

import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import Search from "./pages/Search";
import SignIn from './pages/SignIn';

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  display:flex;
`;

const Main = styled.div`
  flex:11;
  background-color: ${({ theme }) => theme.bg};
  `;

const Wrapper = styled.div`
  /* background-color: red; */
  padding: 2rem 3rem;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu setDarkMode={setDarkMode} darkMode={darkMode} />
          <Main >
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<HomePage type="random" />} />
                  <Route path='trends' element={<HomePage type="trend" />} />
                  <Route path='subscriptions' element={<HomePage type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ? <HomePage /> : <SignIn />}
                  />
                  <Route path='video'>
                    <Route path=':id' element={<VideoPage />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
