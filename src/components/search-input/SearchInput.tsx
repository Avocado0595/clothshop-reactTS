import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import searchIcon from '../../asserts/search.png';
import { useAppSelector } from '../../redux/hooks';
import { selectListProductName } from '../../redux/product/product.slice';
import './SearchInput.scss';
const SearchInput: FC = () => {
	const [value, setValue] = useState<string>('');
	const [resultList, setResultList] = useState<
		Array<{ id: number; name: string }>
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
	return (<InputGroup className="mt-1 w-100">
    
    <FormControl
	style={{paddingLeft:'16px'}}
    placeholder="Find your style here"
    aria-label="Search"
    aria-describedby="search"
	onChange={handleOnChange}
	onKeyDown={handleOnEnter}
    />
	<InputGroup.Text id="search"><img className="search-icon" src={searchIcon} /></InputGroup.Text>
	{resultList.length != 0 ? (
				<div className="search-dropdown">
					{resultList.map((i, idx) => (
						<a key={idx} href={`/product/${i.id}`}>{i.name}</a>
					))}
				</div>) : null}
  </InputGroup>)
};

export default SearchInput;
