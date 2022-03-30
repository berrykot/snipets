class EsqExt {
	constructor(data){
		if (typeof data === "string" || data instanceof String)
			this.esq = new Terrasoft.EntitySchemaQuery(data);
		else if (data instanceof Terrasoft.EntitySchemaQuery)
			this.esq = data;
		else
			throw new Error(`Esq constructor not implement data: ${data} with type: ${typeof data}`);
	}
	get filters() {
		return this.esq.filters;
	}
	get clientCache() {
		return this.esq.clientESQCacheParameters.cacheItemName;
	}
	set clientCache(value) {
		this.esq.clientESQCacheParameters.cacheItemName = value;
	}
	get serverCache() {
		return this.esq.serverESQCacheParameters;
	}
	set serverCache(value) {
		this.esq.serverESQCacheParameters = value;
	}
	addColumn(columnPath, alias){
		if (!alias) alias = columnPath;
		return this.esq.addColumn(columnPath, alias);
	}
	addColumns(...columnPaths){
		for(let columnPath of columnPaths)
		this.addColumn(columnPath);
	}
	getEntity(primaryColumnValue){
			return new Promise(resolve =>
			this.esq.getEntity(primaryColumnValue, result => resolve(result), this)
		);
	}
	getEntityCollection() {
		return new Promise(resolve =>
			this.esq.getEntityCollection(result => resolve(result), this)
		);
	}
	getFirstEntity() {
		this.esq.rowCount = 1;
		return new Promise(resolve =>
			this.esq.getEntityCollection(result => resolve(result.collection.first()), this)
		);
	}
	addColumnFilter(columnPath1, columnPath2, comparisonType = Terrasoft.ComparisonType.EQUAL){
		let filter = Terrasoft.createFilter(comparisonType, columnPath1, columnPath2);
		this.filters.addItem(filter);
	}
	addFilterWithParameter(columnPath, value, comparisonType = Terrasoft.ComparisonType.EQUAL) {
		let filter = Terrasoft.createColumnFilterWithParameter(comparisonType, columnPath, value);
		this.filters.addItem(filter);
	}
	addInFilterWithParameters(columnPath, inValues) {
		let filter = Terrasoft.createColumnInFilterWithParameters(columnPath, inValues);
		this.filters.addItem(filter);
	}
	addNotInFilterWithParameters(columnPath, notInValues) {
		let filter = Terrasoft.createColumnInFilterWithParameters(columnPath, notInValues);
		filter.comparisonType = Terrasoft.ComparisonType.NOT_EQUAL;
		this.filters.addItem(filter);
	}
	addIsNullFilter(columnPath) {
		let filter = Terrasoft.createColumnIsNullFilter(columnPath)
		this.filters.addItem(filter);
	}
	addIsNotNullFilter(columnPath) {
		let filter = Terrasoft.createColumnIsNotNullFilter(columnPath)
		this.filters.addItem(filter);
	}
}
