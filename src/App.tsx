import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonSize, ButtonType } from './components/Button/button'
import Icon from './components/icon/icon'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'
import AutoComplete, {
	DataSourceType
} from './components/AutoComplete/autoComplete'
import Upload from './components/upload/upload'
library.add(fas)

interface lakerWithNumberProps {
	value: string
	number: number
}
const lakersWithNumber: lakerWithNumberProps[] = [
	{ value: 'bradley', number: 11 },
	{ value: 'pope', number: 1 },
	{ value: 'caruso', number: 4 },
	{ value: 'cook', number: 2 },
	{ value: 'cousins', number: 15 },
	{ value: 'james', number: 23 },
	{ value: 'AD', number: 3 },
	{ value: 'green', number: 14 },
	{ value: 'howard', number: 39 },
	{ value: 'kuzma', number: 0 }
]
interface githubApi {
	// [key: string]: string | number
	value: string
	id: number
}
type a = githubApi & {
	[key: string]: number
}
function App() {
	const [show, setShow] = useState(true)
	const [value, setValue] = useState<string>('')
	const fetchSuggestion = (query: string) => {
		// return lakersWithNumber.filter((player) => player.value.includes(query))
		return fetch(`https://api.github.com/search/users?q=${query}`)
			.then((res) => res.json())
			.then(({ items }) => {
				console.log(items)
				return items
					.slice(0, 10)
					.map((item: any) => ({ value: item.login, id: item.id, ...item }))
			})
	}
	const renderOption = (item: DataSourceType) => {
		const renderVal = item as DataSourceType<a>
		return (
			<>
				<h2>Name: {renderVal.value}</h2>
				<p>number: {renderVal.id}</p>
			</>
		)
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		console.log(files)
		if (files) {
			const file = files[0]
			const formData = new FormData()
			formData.append(file.name, file)
			console.log(formData)
		}
	}
	const onProgress = (percentage: number, file: File) => {
		console.log(percentage, file)
	}
	const checkFileSize = (file: File) => {
		if (Math.round(file.size / 1024) > 50) {
			alert('too big')
			return false
		}
		return true
	}
	const beforeUpload = (file: File) => {
		return checkFileSize(file)
	}
	const onChangeFile = (file: File) => {
		console.log(file)
	}
	const filePromise = (file: File) => {
		const newFile = new File([file], 'name_aa.docx', { type: file.type })
		return Promise.resolve(newFile)
	}
	return (
		<div>
			<div>
				<Upload
					action="http://jsonplaceholder.typicode.com/posts/"
					beforeUpload={filePromise}
					onProgress={onProgress}
					onChange={onChangeFile}
				/>
			</div>
			<hr />
			<div>
				<input type="file" name="myFile" onChange={handleChange} />
				<button>上传文件</button>
			</div>
			<hr />
			<Input
				size="lg"
				value={value}
				onChange={(e) => {
					setValue(e.target.value)
				}}
			/>
			<h2>{value}</h2>
			<hr />
			<AutoComplete
				fetchSuggestions={fetchSuggestion}
				renderOption={renderOption}
			/>
			<hr />
			<Button
				onClick={() => {
					alert('111')
				}}
			>
				点击
			</Button>
			<Button disabled={true}>DefaultButton</Button>
			<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
				largeButton
			</Button>
			<Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
				smallButton
			</Button>
			<Button href="http://www.baidu.com" btnType={ButtonType.Link}>
				百度
			</Button>
			<Button
				href="http://www.baidu.com"
				btnType={ButtonType.Link}
				disabled={true}
			>
				百度
			</Button>

			<hr />
			<Menu defaultIndex={'0'} onSelect={(index) => alert(index)}>
				<MenuItem index={'0'}>Link1</MenuItem>
				<MenuItem index={'1'}>Link2</MenuItem>
				<SubMenu title="DropDown">
					<MenuItem>dropDown1</MenuItem>
					<MenuItem>dropDown1</MenuItem>
				</SubMenu>
				<MenuItem index={'2'}>Link3</MenuItem>
			</Menu>

			<Menu
				style={{ marginLeft: '20px' }}
				defaultIndex={'0'}
				mode="vertical"
				defaultOpenSubMenus={['1']}
				onSelect={(index) => alert(index)}
			>
				<MenuItem index={'0'}>Vertical1</MenuItem>
				<SubMenu title="DropDown" index={'1'}>
					<MenuItem>dropDown1</MenuItem>
					<MenuItem>dropDown1</MenuItem>
				</SubMenu>
				<MenuItem index={'2'}>Vertical2</MenuItem>
				<MenuItem index={'3'}>Vertical3</MenuItem>
			</Menu>
			<hr />
			<Icon theme="danger" icon="coffee" />
			<Icon theme="primary" icon="arrow-down" />

			<hr />
			<Button btnType={ButtonType.Primary} onClick={() => setShow(!show)}>
				Show Button
			</Button>
			<Transition in={show} classNames="zoom-in-top" timeout={300} wrapper>
				<p>
					Hello world
					<Button>show Button</Button>
				</p>
			</Transition>
		</div>
	)
}

export default App
