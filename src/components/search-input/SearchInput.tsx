import React, { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import searchIcon from '../../asserts/search.png';
import { useAppSelector } from '../../redux/hooks';
import { selectListProductName } from '../../redux/product/product.slice';
import './SearchInput.scss';
const SearchInput = () => {
	const [value, setValue] = useState<string>('');
	const [resultList, setResultList] = useState<
		Array<{ id: string; name: string , collectionId: string}>
	>([]);
	const productNameList = useAppSelector((state) =>
		selectListProductName(state)
	);
	const navigate = useNavigate();
	const handleSearchClick = () => {
		if (value?.trim()) {
			setValue('');
			setResultList([]);
			navigate(`/search?p=${value.trim()}`);
		}
	};
	const handleOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchClick();
		}
	};
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (e.target.value)
			setResultList(
				productNameList.filter((p) =>
					p.name.toLowerCase().includes(e.target.value.trim())
				)
			);
		else setResultList([]);
	};
	const clearSearch = ()=>{
		setValue('');
		setResultList([]);
	}

	return (<InputGroup className="mt-1 w-100">
    
    <FormControl
	style={{paddingLeft:'16px'}}
    placeholder="Find your style here"
    aria-label="Search"
    aria-describedby="search"
	onChange={handleOnChange}
	onKeyDown={handleOnEnter}
	value={value}
    />
	<InputGroup.Text onClick={handleSearchClick} id="search"><img className="search-icon" src={searchIcon} /></InputGroup.Text>
	
	{resultList.length != 0 ? (
				<Dropdown.Menu className="search-dropdown show">
					{resultList.map((i, idx) => (
						
							<Link onClick={()=>clearSearch()} className='d-block w-100' key={idx} to={`/${i.collectionId}/${i.id}`}>{i.name}</Link>
						
					))}
				</Dropdown.Menu>) : null} 
  </InputGroup>)
};

export default SearchInput;
