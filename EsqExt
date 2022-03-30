using System;
using System.Linq;
using System.Collections.Generic;
using Terrasoft.Common;
using Terrasoft.Core;
using Terrasoft.Core.Entities;


namespace VSK.Base
{
	public class EsqExt<T> : EntitySchemaQuery where T: Entity
	{
		private readonly UserConnection uc;

		public EsqExt(UserConnection userConnection)
			: base(userConnection.EntitySchemaManager, typeof(T).Name)
		{
			uc = userConnection;
		}

		public EsqExt<T> Reset()
		{
			Columns.Clear();
			AddColumn("Id");
			Filters.Clear();
			ResetSelectQuery();
			PrimaryQueryColumn.IsAlwaysSelect = true;
			IgnoreDisplayValues = false;
			UseAdminRights = true;
			return this;
		}

		public EsqExt<T> AddColumn(string columnPath, string alias = null)
		{
			var column = base.AddColumn(columnPath);
			if (alias.IsNotNullOrEmpty()) column.Name = alias;
			return this;
		}

		public EsqExt<T> AddAllColumns()
		{
			AddAllSchemaColumns();
			return this;
		}

		public EsqExt<T> AddColumnOrderedBy(string columnPath, OrderDirection orderDirection, int orderPosition = 1, string alias = null)
		{
			var column = base.AddColumn(columnPath);
			column.OrderDirection = orderDirection;
			column.OrderPosition = orderPosition;
			if (alias.IsNotNullOrEmpty()) column.Name = alias;
			return this;
		}

		public T GetEntity(Guid id)
		{
			RowCount = 1;
			var entity = GetEntity(uc, id);
			return entity != null ? (T)entity : null;
		}

		public T GetFirstOrDefault()
		{
			RowCount = 1;
			var entity = GetEntityCollection(uc).FirstOrDefault();
			return entity != null ? (T)entity : null;
		}

		public IEnumerable<T> GetEntityCollection()
		{
			var entities = GetEntityCollection(uc);
			return entities.Select(e => (T)e);
		}

		public int GetEntityCollectionCount()
		{
			Columns.Clear();
			PrimaryQueryColumn.IsAlwaysSelect = false;
			var countCol = AddColumn(CreateAggregationFunction(AggregationTypeStrict.Count, "Id"));
			var entities = GetEntityCollection(uc);
			return entities.Count > 0 ? entities[0].GetTypedColumnValue<int>(countCol.Name) : 0;
		}

		public IEnumerable<IEnumerable<T>> GetEntityCollectionPageIterator(int entitiesOnPage)
		{
			if (entitiesOnPage <= 0)
				throw new ArgumentOutOfRangeException(nameof(entitiesOnPage));
			throw new NotImplementedException();
		}

		#region Filters
		public EsqExt<T> AddInFilter(string fieldName, params Guid[] values)
		{
			var valuesAsObj = values.Select(v => (object)v);
			Filters.Add(CreateFilterWithParameters(FilterComparisonType.Equal, fieldName, valuesAsObj));
			return this;
		}
		public EsqExt<T> AddNotInFilter(string fieldName, params Guid[] values)
		{
			var valuesAsObj = values.Select(v => (object)v);
			Filters.Add(CreateFilterWithParameters(FilterComparisonType.NotEqual, fieldName, valuesAsObj));
			return this;
		}
		public EsqExt<T> AddInFilter(string fieldName, params object[] values)
		{
			Filters.Add(CreateFilterWithParameters(FilterComparisonType.Equal, fieldName, values));
			return this;
		}
		public EsqExt<T> AddNotInFilter(string fieldName, params object[] values)
		{
			Filters.Add(CreateFilterWithParameters(FilterComparisonType.NotEqual, fieldName, values));
			return this;
		}
		public EsqExt<T> AddFilterWithParameters(string fieldName, object value, FilterComparisonType type = FilterComparisonType.Equal)
		{
			Filters.Add(CreateFilterWithParameters(type, fieldName, value));
			return this;
		}
		public EsqExt<T> AddFilter(IEntitySchemaQueryFilterItem filterItem)
		{
			Filters.Add(filterItem);
			return this;
		}
		public EsqExt<T> AddFilter(string fieldName, string otherFieldName, FilterComparisonType type = FilterComparisonType.Equal)
		{
			Filters.Add(CreateFilter(type, fieldName, otherFieldName));
			return this;
		}
		public EsqExt<T> AddIsNullFilter(string fieldName)
		{
			Filters.Add(CreateIsNullFilter(fieldName));
			return this;
		}
		public EsqExt<T> AddIsNotNullFilter(string fieldName)
		{
			Filters.Add(CreateIsNotNullFilter(fieldName));
			return this;
		}
		public EntitySchemaQueryFilterCollection CreateNewFilterGroup(LogicalOperationStrict logicalOperation)
		{
			var filterGroup = new EntitySchemaQueryFilterCollection(this, logicalOperation);
			return filterGroup;
		}
		public EntitySchemaQueryFilterCollection CreateNewFilterGroup(LogicalOperationStrict logicalOperation, params IEntitySchemaQueryFilterItem[] filters)
		{
			var filterGroup = CreateNewFilterGroup(logicalOperation);
			if (filters != null || filters.Length > 0)
				filterGroup.AddRange(filters);
			return filterGroup;
		}
		public EsqExt<T> AddFilterGroup(LogicalOperationStrict logicalOperation, params IEntitySchemaQueryFilterItem[] filters)
		{
			var filterGroup = CreateNewFilterGroup(logicalOperation, filters);
			AddFilterGroup(filterGroup);
			return this;
		}
		public EsqExt<T> AddFilterGroup(EntitySchemaQueryFilterCollection filterGroup)
		{
			Filters.Add(filterGroup);
			return this;
		}
		#endregion
	}
}
