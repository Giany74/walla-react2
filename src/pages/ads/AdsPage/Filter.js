import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Filter({ onNameChange, onSaleChange }) {
	const [selectedOption, setSelectedOption] = useState('all');

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
					All:
					<input
						type='radio'
						name='salePurchase'
						onChange={() => {
							setSelectedOption('all');
							onSaleChange(null);
						}}
						checked={selectedOption === 'all'}
					/>
				</label>

				<label>
					Sale:
					<input
						type='radio'
						name='salePurchase'
						onChange={() => {
							setSelectedOption('sale');
							onSaleChange(true);
						}}
						checked={selectedOption === 'sale'}
					/>
				</label>

				<label>
					Purchase:
					<input
						type='radio'
						name='salePurchase'
						onChange={() => {
							setSelectedOption('purchase');
							onSaleChange(false);
						}}
						checked={selectedOption === 'purchase'}
					/>
				</label>
			</div>
		</div>
	);
}

Filter.propTypes = {
	onNameChange: PropTypes.func,
	onSaleChange: PropTypes.func,
};

export default Filter;
