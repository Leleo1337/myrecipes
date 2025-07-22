import { Toaster } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router';

//elements
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Recipe from './pages/recipes/Recipe';
import Recipes from './pages/recipes/Recipes';
import Create from './pages/recipes/Create';

function App() {
	return (
		<>
			<Toaster />
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
						path='/recipes/create'
						element={<Create />}
					/>
					<Route
						path='/recipes/:id'
						element={<Recipe />}
					/>
					<Route
						path='/recipes/my-recipes'
						element={''}
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
