import IProduct from './IProduct';

export default interface ICollection {
	title: string;
	id: number;
	imageUrl: string;
	routeName: string;
	items: IProduct[];
}
