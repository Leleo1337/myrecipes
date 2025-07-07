import { BrowserRouter, Route, Routes } from 'react-router';

//elements
import Home from './pages/Home'

function App() {
	return (
		<>
			<BrowserRouter basename='/'>
				<Routes>
          <Route path='/' element={<Home />}/>
        </Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
