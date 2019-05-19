
 ;(function() {
	$.fn.spacecalendar = function(options) {
		var pluginName = 'spacecalendar';

		// Find the plugin attached to the element
		var instance = this.data(pluginName);

		// If the instance wasn't found, create it...
		if(!instance) {
			// Return the element being bound to
			return this.each(function() {
				return $(this).data(pluginName, new spacecalendar(this, options));
			});
		}

		// ...otherwise if the user passes true to the plugin (on the second call),
		// then return the instance of the plugin itself
		return (options === true) ? instance : this;
	};

	// Default options
	$.fn.spacecalendar.defaults =
	{
		// The house id
		houseId: 0,
		
		// 开始时间
		startDate: null,

		// 房源配置数组
		spaceData: [],

		// 是否可以编辑
		isEditable: true,

		// The date that will be treated as 'today'.
		todayDate: function(){
			var today = new Date();
			return today._clear();
		},

		// The date that will appear selected when the spacecalendar renders.
		// By default it will be set to todayDate.
		selectedDate: null,

		// Names of the month that will be shown in the title.
		// Will default to 1月, 2月,...,12月
		monthNames: null,

		// Names of the days of the Week that will be shown below the title.
		// Will default to 周一, 周二,...,周日
		dowNames: null,

		// The day of the week to start the spacecalendar on.  0 is Sunday, 1 is Monday and so on.
		dowOffset: 1,

		// First date of the month.
		firstDate: null
	};

	// Our plugin object
	var spacecalendar = (function() {
		// Main entry point.  Initialize the plugin
		function spacecalendar(element, userOptions) {
			// Grab handle to this
			var self = this;

			// Save bound element to el
			self.el = $(element);
			var el = self.el;

			// Merge user options into default options
			self.options = $.extend(true, {}, $.fn.spacecalendar.defaults, userOptions);
			var options = self.options;

			// Find the spacecalendar element if the user provided one
			self.spacecalendar = $($.find('[gldp-el=' + el.attr('gldp-id') + ' ]'));

			if(!(el.attr('gldp-id') || '').length) {
				el.attr('gldp-id', 'gldp-' + Math.round(Math.random() * 1e10))
			}

			el.addClass('gldp-el');
			
			// Render spacecalendar
			self.render();
			// self.show();
		};

		// Public methods
		spacecalendar.prototype =
		{
			// Render the spacecalendar
			render: function(renderCalback) {
				var self = this;
				var el = self.el;
				var options = self.options;
				var spacecalendar = self.spacecalendar;

				// Build a core class (with border) that every element would have
				var coreClass = ' core border ';
				var cssName = 'gldp-default';

				// Get today
				var todayVal = options.todayDate()._val();
				var todayTime = todayVal.time/1000;

				// Constants
				var maxRow = 6;
				var maxCol = 7;

				var dowNames = options.dowNames || [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ];
				var monthNames = options.monthNames || [ ' 1 月', ' 2 月', ' 3 月', ' 4 月', ' 5 月', ' 6 月', ' 7 月', ' 8 月', ' 9 月', ' 10 月', ' 11 月', ' 12 月' ];

				// Create container width based on el size
				var containerWidth = el.outerWidth();
				// Create cell width based on container size
				var cellWidth = containerWidth / maxCol;

				// If spacecalendar doesn't exist, create it and re-assign it to self
				if(!spacecalendar.length) {
					self.spacecalendar = spacecalendar = $('<div/>')
						.attr('gldp-el', el.attr('gldp-id'))
						.css(
						{
							width: containerWidth + 'px'
						});

					$(el).append(spacecalendar);
				}

				// Add core classes and remove spacecalendar's children
				spacecalendar.removeClass()
					.addClass(cssName)
					.children().remove();

				// Helper function to setDate
				(function() {
					var _firstDate = new Date(options.startDate);
					if(_firstDate.getDate() != 1){
						_firstDate.setDate(1);
						_firstDate.setMonth(_firstDate.getMonth() + 1);
					}
					options.firstDate =  _firstDate;
				})();

				var getStartEndDate = function(_offset) {
					// Create start date as the first date of the month
					var _firstDate = new Date(options.firstDate);
					
					// Default to no offset
					_offset = _offset || 0;
					
					// Adjust date for month offset
					_firstDate.setMonth(_firstDate.getMonth() + _offset);

					var startOffset = _firstDate.getDay() - options.dowOffset;
            			startOffset = startOffset < 1 ? -7 - startOffset : -startOffset;
            
			        var _startDate = _firstDate._add(startOffset)/1000,
			            _endDate = _firstDate._add(7*6-1)/1000;

					return {startDate: _startDate, endDate: _endDate};
				};

				// Get the previous, next start/end dates
				var prevDateObj = getStartEndDate(-1),
				    nextDateObj = getStartEndDate(1);

				var prevStartDate = prevDateObj.startDate,
				 	prevEndDate = prevDateObj.endDate;

				var nextStartDate = nextDateObj.startDate,
				    nextEndDate = nextDateObj.endDate;

				// Get the first date for the current month being rendered
				var firstDateVal = options.firstDate._val();
				var firstDateMonth = firstDateVal.month;
				var firstDateYear = firstDateVal.year;

				var prevCell = $('<div/>')
								.addClass("title")
								.append(
									$('<img/>')
										.addClass('prev-arrow')
										.attr("src", "/public/img/prev.png")
								)
								.mousedown(function() { return false; })
								.click(function(e) {
									window.location.href = "/spaces/index?house_id=" + options.houseId + "&startDate=" + prevStartDate + "&endDate=" + prevEndDate;
								});
				
				var titleCell = $('<div/>').addClass('title');

				var nextCell = $('<div/>')
								.addClass("title")
								.append(
									$('<img/>')
										.addClass('next-arrow')
										.attr("src", "/public/img/next.png")
								)
								.mousedown(function() { return false; })
								.click(function(e) {
									window.location.href = "/spaces/index?house_id=" + options.houseId + "&startDate=" + nextStartDate + "&endDate=" + nextEndDate;
								});

				// Add cells for prev/title/next
				spacecalendar
					.append(prevCell)
					.append(titleCell)
					.append(nextCell)
					.append($('<div style="clear: both;"></div>'));

				// Add all the cells to the spacecalendar
				for(var row = 0, cellIndex = 0; row < maxRow + 1; row++) {
					for(var col = 0; col < maxCol; col++, cellIndex++) {
						var cellDate = new Date(options.startDate);
						var cellClass = 'day';
						var cell = $('<div/>');
						var cellCSS = {width: cellWidth + 'px'};

						if(!row) {
							cellClass = 'core dow';
							cell.html(dowNames[col]);
							cellDate = null;
							// Assign other properties to the cell
							cell.addClass(cellClass)
								.css(cellCSS);
							if(col == maxCol-2){
								cell.addClass("sat");
							}else if(col == maxCol-1){
								cell.addClass("sun");
							}
						} else {
							// Get the new date for this cell
							cellDate._add(col + ((row - 1) * maxCol));

							// Get value for this date
							var cellDateVal = cellDate._val();
							var cellDateTime = cellDateVal.time/1000;

							// Assign date for the cell
							var daySpan = $("<span/>");
							daySpan.addClass("day").html(cellDateVal.date + "日");
							cell.append(daySpan);

							// 房源配置信息
							var spaceDiv = $("<div/>");
							if(options.spaceData.length == 0){
								if(todayTime <= cellDateTime){
									spaceDiv.addClass("opening countDiv").html("等待开放预约");
								}else{
									spaceDiv.addClass("unopened countDiv").html("未开放预约");
								}
							}else{
								var isFind = false;
								for(var i = 0, len = options.spaceData.length; i < len; i++){
									var spaceData = options.spaceData[i];
									if(spaceData.useDate == cellDateTime){
										var slashSpan = $('<span/>').html(" / ");
										var useSpan = $('<span/>');
											useSpan.addClass("useCount").html(spaceData.useCount);
										var totalSpan = $('<span/>');
											totalSpan.addClass("totalCount").html(spaceData.totalCount);

										spaceDiv
											.addClass("opened countDiv")
											.append(useSpan)
											.append(slashSpan)
											.append(totalSpan);
										
										cell.data('spaceData', spaceData);
										isFind = true;
										break;
									}
								}
								if(!isFind){
									if(todayTime <= cellDateTime){
										spaceDiv.addClass("opening countDiv").html("等待开放预约");
									}else{
										spaceDiv.addClass("unopened countDiv").html("未开放预约");
									}
								}
							}
							cell.append(spaceDiv);

							// Handle active dates and weekends
							cellClass = ([ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ])[cellDateVal.day];

							// Handle today or selected dates
							if(cellDateVal.month != firstDateMonth) { cellClass += ' outMonth'; }
							if(cellDateTime < todayTime) { cellClass += ' prevDay'; }
							if(cellDateTime == todayTime) { cellClass = 'today';}

							// Update the css for the cell
							if(col == 0){
								$.extend(cellCSS,
								{
									borderLeftWidth: 0
								});
							}else if(col == 6){
								$.extend(cellCSS,
								{
									borderRightWidth: 0
								});
							}

							// Assign other properties to the cell
							cell
								.data('useDate', cellDateTime)
								.addClass(coreClass + cellClass)
								.css(cellCSS);

							// 加入popover
							if(options.isEditable){
								if(cellDateTime >= todayTime) {
									cell.spacepopover("init", {id: cellDateTime, idName: "spacePopover"});
								}
							}
						}

						// Add cell to spacecalendar
						spacecalendar.append(cell);
					}
				}

				// Render the month / year title
				// Build month label
				var monthText = $('<span/>')
									.html(monthNames[firstDateMonth]);

				// Build year label
				var yearText = $('<span/>')
									.html(firstDateYear + " 年 ");

				var titleYearMonth = $('<div/>')
										.append(yearText)
										.append(monthText);

				// Add to title
				titleCell.children().remove();
				titleCell.append(titleYearMonth);

				// Run the callback signaling end of the render
				renderCalback = renderCalback || (function() {});
				renderCalback();
			}
		};

		// Return the plugin
		return spacecalendar;
	})();

	// One time initialization of useful prototypes
	(function() {
		Date.prototype._clear = function() {
			this.setHours(8);
			this.setMinutes(0);
			this.setSeconds(0);
			this.setMilliseconds(0);

			return this;
		};

		Date.prototype._add = function(days) {
			return this.setDate(this.getDate() + days);
		};

		Date.prototype._val = function() {
			return {
				year: this.getFullYear(),
				month: this.getMonth(),
				date: this.getDate(),
				time: this.getTime(),
				day: this.getDay()
			};
		};
	})();
})();