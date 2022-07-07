export default function handleSlugName(path: string) {
	if (!path) return '';
	const pathArray = path.split('/');
	if (!pathArray || pathArray.length == 0) return '';
	return pathArray[pathArray.length - 1];
}
