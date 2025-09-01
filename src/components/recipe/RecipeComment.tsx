import Avatar from 'react-avatar';
import type { commentProps } from '../../types/components/comments';
import { Link } from 'react-router';
import UserContext from '../../context/user';
import { useContext, useEffect, useRef, useState } from 'react';
import { Edit, EllipsisVertical, Send, Trash, X } from 'lucide-react';
import { deleteComent, updateComment } from '../../services/comments';
import { toast } from 'sonner';

export default function RecipeComment({ recipeID, _id, createdBy, text, createdAt, fetchComments }: commentProps) {
	const [commentFormData, setCommentFormData] = useState<{ text: string }>({ text });
	const [isFormActive, setIsFormActive] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const user = useContext(UserContext);
	const isLoggedInUserOwner = createdBy._id === user?.userID;
	const date = new Date(createdAt);
	const formattedDate = date.toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	});

	function handleClickEdit() {
		setIsMenuOpen(false);
		setIsFormActive(true);
	}

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const key = e.target.name;
		const value = e.target.value;

		setCommentFormData((prev) => ({ ...prev, [key]: value }));
	}

	async function handleCommentSubmit() {
		try {
			await updateComment(recipeID, _id, commentFormData);
			fetchComments(1);
			toast.success('Comentario editado com sucesso!');
		} catch (error: any) {
			toast.error(error.data.msg);
		}
	}

	async function handleDeleteComment() {
		if (window.confirm('Você tem certeza que deseja excluir esse comentario?')) {
			await deleteComent(recipeID, _id);
			fetchComments(1)
		}
	}

	function handleClickOutsideMenu(e: Event) {
		if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
			setIsMenuOpen(false);
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutsideMenu);

		return () => document.removeEventListener('click', handleClickOutsideMenu);
	}, []);

	return (
		<div className='flex p-4 bg-slate-50 rounded-2xl'>
			{createdBy.profilePicture ? (
				<img
					src={createdBy.profilePicture}
					alt='user pfp'
					className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-black/20'
				/>
			) : (
				<Avatar
					name={createdBy.name}
					size='32'
					className='w-8 h-8 text-xs rounded-full'
				/>
			)}
			<div className='flex flex-col w-full ml-2 group-hover:text-emerald-600'>
				<div className='flex justify-between'>
					<div className='flex gap-2'>
						<Link to={`/user/${createdBy._id}/profile`}>
							<h6 className='text-sm font-semibold cursor-pointer hover:text-emerald-600 sm:text-base'>{createdBy.name ? createdBy.name : 'username'}</h6>{' '}
						</Link>
						<span className='flex items-center gap-1 text-xs font-semibold text-gray-500'>{formattedDate}</span>
					</div>
					<div className='relative'>
						{isLoggedInUserOwner && (
							<div
								onClick={(e) => {
									setIsMenuOpen(!isMenuOpen);
									e.stopPropagation();
								}}>
								<EllipsisVertical
									size={16}
									className={`cursor-pointer hover:text-emerald-600 ${isMenuOpen && 'text-emerald-600'}`}
								/>
							</div>
						)}
						{isLoggedInUserOwner && isMenuOpen && (
							<div
								ref={menuRef}
								className='absolute z-10 bg-white border border-gray-300 rounded-md right-2 top-4'>
								<button
									onClick={handleClickEdit}
									className='flex items-center w-full gap-2 px-4 py-2 text-sm font-semibold transition duration-100 cursor-pointer hover:text-white hover:bg-blue-500 ease'>
									<Edit size={16} />
									Editar
								</button>
								<button
									onClick={handleDeleteComment}
									className='flex items-center w-full gap-2 px-4 py-2 text-sm font-semibold transition duration-100 cursor-pointer hover:text-white hover:bg-red-500 ease'>
									<Trash size={16} />
									Excluir
								</button>
							</div>
						)}
					</div>
				</div>
				{isFormActive ? (
					<>
						<textarea
							onChange={handleChange}
							value={commentFormData.text}
							name='text'
							id='text'
							className='w-full p-4 transition duration-100 ease-in border border-gray-300 rounded-md focus:ring focus:ring-emerald-500 outline-0'></textarea>
						<div className='flex flex-col gap-2 pt-2 sm:flex-row'>
							<button
								onClick={handleCommentSubmit}
								className='flex items-center w-full sm:w-auto gap-2 px-3 py-1.5 text-white transition duration-100 ease-in rounded-md cursor-pointer hover:bg-emerald-700 bg-emerald-600'>
								<Send size={16} /> Salvar
							</button>
							<button
								onClick={() => setIsFormActive(false)}
								className='flex items-center w-full sm:w-auto gap-2 px-3 py-1.5 transition duration-100 ease-in border rounded-md cursor-pointer text-emerald-600 border-emerald-600 hover:bg-emerald-700 hover:text-white'>
								<X size={16} /> Cancelar
							</button>
						</div>
					</>
				) : (
					<p className='text-sm text-gray-600 break-all'>{text}</p>
				)}
			</div>
		</div>
	);
}
