import { BrowserRouter, Route, Routes } from 'react-router';

//elements
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Recipe from './pages/recipes/Recipe';
import Recipes from './pages/recipes/Recipes';

function App() {
	return (
		<>
			<BrowserRouter basename='/'>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/recipes'
						element={<Recipes />}
					/>
					<Route
						path='/recipe/:id'
						element={<Recipe />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
