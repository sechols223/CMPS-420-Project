import {Container, Loader} from '@mantine/core';


type LoadingContainerProps = {
	loading?: boolean
	children?: React.ReactNode
}

export const LoadingContainer: React.FC<LoadingContainerProps> = ({ loading, children }) => {
	
	if (loading) {
		return (
			<Container>
				<Loader size={2} />
			</Container>
		)
	}
	
	return <>{children}</>
}