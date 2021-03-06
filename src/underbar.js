(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {

  	return val;

  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
  	if (n === undefined) {
  		return array[array.length-1];
  	} else if (n==0){
  		return [];
  	} else if (n>array.length-1){
  		return array;
  	} else {
  		return array.slice(n-1, array.length);
  	}
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

  	if (Array.isArray(collection)){
  	for (var i=0; i<collection.length; i++){
  		iterator(collection[i],i,collection);
  	} 
  	} else {
  		for (var key in collection){
  			iterator(collection[key], key, collection);
  		}
  	}

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
  	var res = [];
 	if (Array.isArray(collection)){
  		for (var i=0; i<collection.length; i++){
  		var temp = test(collection[i],i,collection);
  		if (temp == true) {
  			res.push(collection[i]);
  		}
  	} 
  	} else {
  		for (var key in collection){
  			var temp = test(collection[key], key, collection);
  			if (temp == true) {
  			res.push(collection[i]);
  		}
  		}
  	}
  	return res;
  };
  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    										//collection has array of values we need to pick from [1,2,3,4]
    var res =[];
    _.filter(collection, function(s){
    	if (!test(s)){
    		res.push(s);
    	}
    });
    return res; 
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
  	var obj = {};
  	var res = [];
  	_.each(array,function(s){
  		obj[s] ? obj[s]++ : obj[s]=1;
  	});

  	for (var key in obj){
  		if (parseInt(key) !== NaN) {
  			res.push(parseInt(key));
  		} else {
  		res.push(key);
  	}
  	}

  	return res;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var res = [];
    _.each(collection, function(value,index,collection2){
    	res.push(iterator(value, index, collection2));
    })
    return res;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
  	
  	if (accumulator !== undefined){
  		var res = accumulator;
  		_.each(collection, function(s){
  			res = iterator(res, s);
  		});
  		return res;
  	} else {
  		var res = collection[0];
  		for (var i=1; i<collection.length; i++){
  			res = iterator(res, collection[i]);
  		}
  		return res;
  	}
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!

    //see if [1,2,3] (collection) contains 3 (target)
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target; //if 1===3 --> returns false
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (typeof iterator !== 'undefined'){
    return _.reduce(collection, function(passTest, item){
    	if (!passTest) {
    		return false;
    	} else if (iterator(item)){
    		return true;
    	} else if (!iterator(item)){
    		return false;
    	}
    }, true);
	} else {
		return _.reduce(collection,function(passTest, item){
			if(!passTest){
				return false;
			} else if (item) {
				return true;
			} else if (!item){
				return false;
			}
		}, true);
	}
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // [2,2,3] some even?
    // every => some
    // ! every && ! none --> some
 
   var res = false;

    _.each(collection, function(s) {
      if (_.every([s], iterator)) {
        res = true;
      }
    });

    return res;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
  	//for loop through arguments
  	//for loop through keys in object

  	for (var i=1; i<arguments.length; i++) {
  		for (var key in arguments[i]) {
  			obj[key]=arguments[i][key];
  		}
  	}

  	return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

  	for (var i=1; i<arguments.length; i++) {
  		for (var key in arguments[i]) {
  			if (typeof obj[key]=== 'undefined'){
  			obj[key]=arguments[i][key];
  			}
  		}
  	}

  	return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {


    var cache = {};

    return function() {

    	var args = Array.prototype.slice.call(arguments);
     	var stringKey = args.toString() + args.length;

     	if (stringKey in cache){
     		return cache[stringKey];
     	} else {
        return cache[stringKey] = func.apply(this, args);
    	}
    }
      
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

  	var args = Array.prototype.slice.call(arguments).slice(2);
  	var runFunc = function(){
  		return func.apply(this, args);
  	}

  	return setTimeout(runFunc, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

  	var randomIndex, temp;
  	var tempArray = array.slice(0, array.length);
  	var count = tempArray.length;

  	while (count){
  		randomIndex =  Math.floor(Math.random() * count);
  		count--;

  		temp = tempArray[randomIndex];
  		tempArray[randomIndex] = tempArray[count];
  		tempArray[count] = temp;
  	}
	return tempArray;
  	
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {

    return _.map(collection, function(s){
      if (typeof functionOrKey == 'function') {
        return functionOrKey.apply(s,args);
      } else {
        return s[functionOrKey].apply(s,args);
      }
    });

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

  if (typeof iterator == 'function'){
    return collection.sort(function(a,b){
      return iterator(a)-iterator(b);
    });
  } else {
    return collection.sort(function(a,b){
      return a[iterator] - b[iterator];
    });
  }
   
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var res = [];
    var args = Array.prototype.slice.call(arguments); //[[a,b,c,d],[1,2,3]]
    //determine longest argument array length
   var longest = 0;
    for (var i =0; i<args.length;i++){
      if (args[i].length > longest){
        longest = args[i].length;
      }
    }
    //nested for loop to pair each of them
    for (var j=0; j<longest;j++){ //y axis
       var inner = [];
      for (var k =0; k<args.length;k++){ //x axis
        inner.push(args[k][j]);
      }
      res.push(inner);
    }
    return res;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    
    var res = [];
    
  function arrayPusher(arr){
      for(var i =0; i<arr.length; i++) {
        //if not array, push
        if (!Array.isArray(arr[i])) {
          res.push(arr[i]);
        } else {
          // if is Array, check to see if child of array is array
          arrayPusher(arr[i]);
        }
      }
    }
    arrayPusher(nestedArray);
    return res;
    
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var res = [];
    var args = Array.prototype.slice.call(arguments);
    //determine shortest array
    var shortestLength = Infinity;
    var shortest;
    for (var i =0; i<args.length;i++){
      if (args[i].length < shortestLength){
        shortestLength = args[i].length;
        shortest = args[i];
      }
    }
    //loop through shortest array to see if other arguments arrays contain the indexed value
    _.each(shortest, function(s){ // for each value in shortest
      var tempArray = [];
      for (var j=0; j<args.length;j++){
        if (_.contains(args[j],s)){
          tempArray.push(s);
        }
      } // look through each argument array to see if it contains s
      // if s appears the same number of times as there are arguments, add s to the result
      if (tempArray.length == args.length){
        res.push(s);
      }
    });
    return res;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) { //[1, 2, 3, 4], [2, 30, 40], [1, 11, 111]
    var res = [];
    var args = Array.prototype.slice.call(arguments,1);

    _.each(array, function(s){ // for each value in first argument
      var tempArray = [];
      for (var j=0; j<args.length;j++){
        if (!_.contains(args[j],s)){
          tempArray.push(s);
        }
      }
       if (tempArray.length == args.length){
        res.push(s);
      }
    });
      return res;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

    //Enabler of function to run
    var canTrigger = true;

    var delay = function(){
      return canTrigger = true;
    }; // delays when original function can be invoked again

    return function(){
      if(canTrigger){
        func.apply(this, arguments);
        canTrigger = false;
        setTimeout(delay, wait);
      }
    }
  };
}());
