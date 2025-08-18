import { X } from 'lucide-react';

export type profileEditModalProps = {
	isModalOpen: boolean;
	toggleModal: () => void;
};

export default function ProfileEditModal({ isModalOpen, toggleModal }: profileEditModalProps) {
	return (
		<>
			<div className={`${isModalOpen ? 'opacity-100' : 'opacity-0'} absolute top-1/2 left-1/2 -translate-1/2 w-50 h-50 bg-white`}>
				<X onClick={toggleModal} />
			</div>
		</>
	);
}
