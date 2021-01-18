import React, { ChangeEvent, FC, useRef } from 'react'

import axios from 'axios'

import Button, { ButtonType } from '../Button/button'

interface UploadProps {
	action: string
	beforeUpload?: (file: File) => boolean | Promise<File>
	onProgress?: (percentage: number, file: File) => void
	onSuccess?: (data: any, file: File) => void
	onError?: (err: any, file: File) => void
	onChange?: (file: File) => void
}

export const Upload: FC<UploadProps> = (props) => {
	const {
		action,
		beforeUpload,
		onProgress,
		onSuccess,
		onError,
		onChange
	} = props
	const fileInput = useRef<HTMLInputElement>(null)
	const handleClick = () => {
		if (fileInput.current) {
			fileInput.current.click()
		}
	}
	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) {
			return
		}
		uploadFile(files)
		if (fileInput.current) {
			fileInput.current.value = ''
		}
	}
	const uploadFile = (files: FileList) => {
		const postFiles = Array.from(files)
		postFiles.forEach((file) => {
			if (!beforeUpload) {
				post(file)
			} else {
				const result = beforeUpload(file)
				if (result && result instanceof Promise) {
					result.then((processedFile) => {
						post(processedFile)
					})
				} else if (result !== false) {
					post(file)
				}
			}
		})
	}

	const post = (file: File) => {
		const formData = new FormData()
		formData.append(file.name, file)
		axios
			.post(action, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (e) => {
					let percentage = Math.round((e.loaded * 100) / e.total) || 0
					if (percentage) {
						if (onProgress) {
							onProgress(percentage, file)
						}
					}
				}
			})
			.then((data) => {
				console.log(data)
				if (onSuccess) {
					onSuccess(data, file)
				}
				if (onChange) {
					onChange(file)
				}
			})
			.catch((err) => {
				if (onError) {
					onError(err, file)
				}
			})
	}
	return (
		<div className="viking-upload-component">
			<Button btnType={ButtonType.Primary} onClick={handleClick}>
				Upload file
			</Button>
			<input
				type="file"
				className="viking-file-input"
				ref={fileInput}
				onChange={handleFileChange}
				style={{ display: 'none' }}
			/>
		</div>
	)
}

export default Upload
