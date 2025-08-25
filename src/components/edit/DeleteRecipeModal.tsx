import type { deleteRecipeModalProps } from "../../types/components/UI";

export default function DeleteRecipeModal({ isModalOpen, toggleModal, onDelete }: deleteRecipeModalProps) {
	return (
		<div
			className={`${isModalOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none -translate-y-10'} border rounded-md shadow border-gray-300 z-1 fixed top-32 left-1/2 -translate-1/2 transition ease-in duration-100 bg-white p-6`}>
			<h1 className="font-semibold">Você tem certeza que deseja excluir a receita?</h1>
			<div className="flex justify-end gap-2 pt-2">
                <button
                    onClick={toggleModal}
                    className='px-4 py-1 font-semibold text-white transition duration-100 ease-in bg-red-500 rounded-md cursor-pointer hover:bg-red-600'>
                    Não
                </button>
                <button
                    onClick={onDelete}
                    className='px-4 py-1 transition duration-100 ease-in bg-white border border-gray-400 rounded-md cursor-pointer font-semibol hover:bg-emerald-600 hover:text-white'>
                    Sim
                </button>
            </div>
		</div>
	);
}
