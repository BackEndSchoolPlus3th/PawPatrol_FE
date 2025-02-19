const PetRegisterModal = ({ isOpen, onClose, onSubmit, petFormData, setPetFormData }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">반려견 등록</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="이름"
                            className="px-3 py-2 border rounded"
                            value={petFormData.name}
                            onChange={e => setPetFormData({ ...petFormData, name: e.target.value })}
                            required
                        />
                        <input
                            type="date"
                            className="px-3 py-2 border rounded"
                            value={petFormData.birthDate}
                            onChange={e => setPetFormData({ ...petFormData, birthDate: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="품종"
                            className="px-3 py-2 border rounded"
                            value={petFormData.breed}
                            onChange={e => setPetFormData({ ...petFormData, breed: e.target.value })}
                            required
                        />
                        <select
                            className="px-3 py-2 border rounded"
                            value={petFormData.size}
                            onChange={e => setPetFormData({ ...petFormData, size: e.target.value })}
                            required
                        >
                            <option value="small">소형</option>
                            <option value="medium">중형</option>
                            <option value="large">대형</option>
                        </select>
                        <input
                            type="text"
                            placeholder="동물등록번호"
                            className="px-3 py-2 border rounded"
                            value={petFormData.registrationNumber}
                            onChange={e => setPetFormData({ ...petFormData, registrationNumber: e.target.value })}
                            required
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="px-3 py-2 border rounded"
                            onChange={e => setPetFormData({ ...petFormData, image: e.target.files[0] })}
                            required
                        />
                    </div>
                    <textarea
                        placeholder="특징"
                        className="w-full px-3 py-2 border rounded"
                        value={petFormData.characteristics}
                        onChange={e => setPetFormData({ ...petFormData, characteristics: e.target.value })}
                        required
                    />
                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                            취소
                        </button>
                        <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded">
                            등록하기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PetRegisterModal;