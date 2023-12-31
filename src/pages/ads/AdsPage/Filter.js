import React from 'react';

function Filter({ onNameChange, onSaleChange, onPurchaseChange }) {
	return (
		<div
			className='filter'
			style={{ padding: '10px', border: '1px solid #ccc' }}
		>
			<label>
				Name:
				<input
					type='text'
					onChange={onNameChange}
					style={{
						border: '1px solid #ccc',
						borderRadius: '4px',
						padding: '8px',
					}}
				/>
			</label>
			<div>
				<label>
					Sale:
					<input
						type='radio'
						name='salePurchase'
						onChange={() => onSaleChange(true)}
					/>
				</label>

				<label>
					Purchase:
					<input
						type='radio'
						name='salePurchase'
						onChange={() => onSaleChange(false)}
					/>
				</label>
			</div>
		</div>
	);
}

export default Filter;
