import { Loader2, MessageCircle, Send } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/auth';
import UserContext from '../../context/user';
import type { commentProps } from '../../types/components/comments';
import { createComment, fetchRecipeComments } from '../../services/comments';
import { Link, useParams } from 'react-router';
import { toast } from 'sonner';
import Avatar from 'react-avatar';
import RecipeComment from './RecipeComment';
import PaginationButtons from '../ui/PaginationButtons';

export default function RecipeComments() {
	const [commentFormData, setCommentFormData] = useState<{ text: string }>({ text: '' });
	const [currentComments, setCurrentComments] = useState<commentProps[]>([]);
	const [isCommentsLoading, setIsCommentsLoading] = useState(false);
	const [pageIndex, setPageIndex] = useState(1);
	const [pageLimit, setPageLimit] = useState(0);
	const [commentsLength, setCommentsLength] = useState(0);

	const auth = useContext(AuthContext);
	const user = useContext(UserContext);
	const params = useParams();

	if (!auth || !user) throw new Error('Usuario não encontrado');

	const { isAuthenticated } = auth;
	const { username, profilePicture } = user;

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const key = e.target.name;
		const value = e.target.value;

		setCommentFormData((prev) => ({ ...prev, [key]: value }));
	}

	async function handleCommentSubmit() {
		try {
			await createComment(commentFormData, params.id);
			setCommentFormData({ text: '' });
			getRecipeComments(pageIndex);
		} catch (err: any) {
			toast.error(err.response.errors[0].msg);
		}
	}

	async function getRecipeComments(page: number) {
		setIsCommentsLoading(true);
		const recipeID = params.id!;
		const comments = await fetchRecipeComments(recipeID, page);
		const pageLimit = Math.ceil(comments.total / comments.limit);
		setCommentsLength(comments.total);
		setPageLimit(pageLimit);
		setCurrentComments(comments.data);
		setIsCommentsLoading(false);
	}

	function nextPage() {
		if (pageIndex < pageLimit) {
			setPageIndex((prev) => prev + 1);
		}
	}
	function prevPage() {
		setPageIndex((prev) => prev - 1);
	}

	useEffect(() => {
		getRecipeComments(pageIndex);
	}, [pageIndex]);

	useEffect(() => {
		getRecipeComments(pageIndex);
	}, []);

	return (
		<>
			<div className='flex items-center gap-2'>
				<div className='p-1.5 text-white bg-emerald-600 rounded-xl'>
					<MessageCircle />
				</div>
				<span className='font-semibold text-gray-700'>Comentarios ({commentsLength})</span>
			</div>
			<div>
				<div className='pt-8'>
					{isAuthenticated ? (
						<div className='flex gap-2'>
							{profilePicture ? (
								<img
									src={profilePicture}
									alt='user profile picture'
									className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
								/>
							) : (
								<Avatar
									name={username}
									size='32'
									className='w-8 h-8 mr-2 text-xs rounded-full outline-1 outline-green-500/80'
								/>
							)}
							<div className='w-full'>
								<textarea
									onChange={handleChange}
									value={commentFormData.text}
									name='text'
									id='text'
									className='w-full p-4 transition duration-100 ease-in border border-gray-300 rounded-md focus:ring focus:ring-emerald-500 outline-0'></textarea>
								<button
									onClick={handleCommentSubmit}
									className='flex items-center gap-2 px-4 py-2 mt-2 text-white transition duration-100 ease-in cursor-pointer hover:bg-emerald-700 rounded-xl bg-emerald-600'>
									<Send size={16} /> comentar
								</button>
							</div>
							<div></div>
						</div>
					) : (
						<div className='flex flex-col gap-6'>
							<div>
								<h1 className='text-2xl font-semibold text-center'>quer comentar ?</h1>
								<p className='text-center text-gray-600'>faça parte da nossa comunidade</p>
							</div>
							<div className='flex flex-col gap-2 sm:flex-row'>
								<Link
									to={'/login'}
									className='flex items-center justify-center w-full py-2 my-1 font-semibold transition duration-100 ease-in border rounded-md md:my-0 md:px-6 border-emerald-600/60 text-emerald-500 md:text-gray-600 hover:text-gray-400'>
									Entrar
								</Link>
								<Link
									to={'/register'}
									className='flex items-center justify-center w-full py-2 my-1 font-semibold text-white transition duration-100 ease-in rounded-md md:my-0 md:px-6 bg-emerald-600 hover:bg-emerald-700'>
									Cadastrar
								</Link>
							</div>
						</div>
					)}
				</div>
				<div className='p-4 space-y-2 md:p-6'>
					{isCommentsLoading ? (
						<div className='flex items-center justify-center'>
							<Loader2
								className='animate-spin text-emerald-600'
								size={40}
							/>
						</div>
					) : currentComments.length > 0 ? (
						currentComments.map((comment) => (
							<RecipeComment
								key={comment._id}
								_id={comment._id}
								recipeID={comment.recipeID}
								createdBy={comment.createdBy}
								createdAt={comment.createdAt}
								text={comment.text}
								fetchComments={getRecipeComments}
							/>
						))
					) : (
						<div className='pt-8 text-center text-gray-700'>There is no comments for this recipe :(</div>
					)}
					<div>
						<PaginationButtons
							nextPage={nextPage}
							prevPage={prevPage}
							pageIndex={pageIndex}
							pageLimit={pageLimit}
							size={'small'}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
