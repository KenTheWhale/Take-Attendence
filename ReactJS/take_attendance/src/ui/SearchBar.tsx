import style from '../styles/SearchBar.module.css'
import {ChangeEvent, useState} from "react";

interface Props {
    dataName:string[],
    dataCode:string[],
    searchFunction: (keyword:string, type:string) => void,
}

function SearchBar(props: Props) {

    const [keyword, setKeyword] = useState('')
    const [type, setType] = useState('name')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.currentTarget.value);
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setType(event.currentTarget.value);
    }
    return (
        <div className={style.search_container}>
            <input className="form-control" list="datalistOptions" id="exampleDataList"
                   placeholder="Type to search..." onChange={handleChange} value={keyword}/>
            <select className="form-select" onChange={handleSelectChange} value={type}>
                <option value="name">Name</option>
                <option value="code">Code</option>
            </select>
            <button className={`btn btn-success`} onClick={() => props.searchFunction(keyword, type)}>Search</button>
            <datalist id="datalistOptions">
                {
                    type === 'name' ? (
                        props.dataName.map((d, index) => {
                            return (
                                <option key={index} value={d}/>
                            )
                        })
                    ) : (
                        props.dataCode.map((d, index) => {
                            return (
                                <option key={index} value={d}/>
                            )
                        })
                    )
                }
            </datalist>
        </div>
    );
}


export default SearchBar;