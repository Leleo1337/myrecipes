import { Toaster } from 'sonner';
import { BrowserRouter, Route, Routes } from 'react-router';

//elements
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Recipe from './pages/recipes/Recipe';
import Recipes from './pages/recipes/Recipes';
import AuthRoute from './components/routes/AuthRoute';
import Profile from './pages/user/Profile';
import CreateRecipe from './pages/recipes/CreateRecipe';
import EditRecipe from './pages/recipes/EditRecipe';

function App() {
	return (
		<>
			<Toaster
				richColors
				position='top-center'
			/>
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
						path='/recipes/:id'
						element={<Recipe />}
					/>
					<Route
						path='/recipes/create'
						element={
							<AuthRoute>
								<CreateRecipe />
							</AuthRoute>
						}
					/>
					<Route
						path='/recipes/:recipeID/edit'
						element={
							<AuthRoute>
								<EditRecipe />
							</AuthRoute>
						}
					/>
					<Route
						path='/user/:userID/profile'
						element={<Profile />}
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
