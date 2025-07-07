import { ChefHat } from 'lucide-react';

export default function Home() {
	return (
		<>
			<header>
				<div>
					<div>
						<ChefHat />
					</div>
					<span>myRecipes</span>
				</div>
				<ul>
					<li>
						<button>Entrar</button>
					</li>
					<li>
						<button>Cadastrar</button>
					</li>
				</ul>
			</header>
		</>
	);
}
