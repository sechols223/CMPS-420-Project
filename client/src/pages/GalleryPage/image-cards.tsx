﻿import React from 'react';
import {useAsync} from 'react-use';
import {api} from '@/api';
import {ImageGetDto, PaginatedResponse} from '@/types';
import {LoadingContainer} from '@/components/loading-container';
import {AspectRatio, Badge, Card, Group, Image, Text} from '@mantine/core';
import classes from '@/CSS/HeaderMegaMenu.module.css';

export const ImageCards: React.FC = () => {

	const fetchImages = useAsync(async () => {
		const response = await api.get<PaginatedResponse<ImageGetDto>>('/api/images')
		return response.data
	}, [])
	
	return (
		<LoadingContainer loading={fetchImages.loading}>
			{	fetchImages.value?.items.map((image) => (
				<Card key={image.name} p="md" radius="md" component="a" href="#" className={classes.card}>
					<AspectRatio ratio={1920 / 1080}>
						<Image src={image.imageData} />
					</AspectRatio>
					<Text className={classes.title} mt={5}>
						{image.name}
					</Text>
					<Text className={classes.title} mt={5}>
						<Group>
							{image.tags.map((tag) => <Badge>{tag}</Badge>)}
						</Group>
					</Text>
				</Card>
			))}
		</LoadingContainer>
	)
}