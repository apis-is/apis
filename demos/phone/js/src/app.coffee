window.APIs =
    Models: {}
    Views: {}
    Collections: {}

window.template = (id) -> $('#' + id + 'Template').html()

APIs.Models.Person = Backbone.Model.extend
    defaults:
        number: '-'

APIs.Views.Person = Backbone.View.extend
    tagName: 'tr'
    template: _.template template('person')
    render: ->
        if @model.get('number') is '' then @model.set number: '-'
        if @model.get('address') is ' ' then @model.set address: '-'
        @$el.html @template @model.toJSON()
        @

APIs.Collections.Persons = Backbone.Collection.extend
    model: APIs.Models.Person
    comparator: (model) -> model.get('name')

APIs.Views.Persons = Backbone.View.extend
    tagName: 'tbody'
    render: ->
        @collection.forEach ((model) ->
            @el.appendChild new APIs.Views.Person(model: model).render().el), @
        @

generateView = (data) ->
    $(query).prop 'disabled', false
    $('.loader').toggleClass 'hidden'

    if data.results.length is 0
        $('.wrapper').append $('<p>').addClass('no-results').html 'Ekkert fannst...'
        $('p.no-results').delay(5000).slideUp()
    else
        people = new APIs.Collections.Persons data.results
        persons = new APIs.Views.Persons collection: people

        $('#results table').append persons.render().el

        $('.json pre').html JSON.stringify data, undefined, 4
        prettyPrint()

        $('td.number').each (i, el) ->
            if $(el).html().match /(\d{3})(\d{4})/
                $(el).html $(el).html().replace /(\d{3})(\d{4})/, '$1-$2'

        $('#results').toggleClass 'hidden'
        $('.loader').addClass 'hidden'

getPeople = (name) ->
    $.ajax 'http://apis.is/phone',
        type: 'POST'
        data: name: name
        success: (data, textStatus, jqXHR) -> generateView data

APIs.Views.Search = Backbone.View.extend
    el: '.search'
    events:
        'webkitspeechchange': 'submitForm'
        'submit': 'submitForm'

    submitForm: (e) ->
        e.preventDefault()

        $('.welcome').remove()

        $('#results').addClass 'hidden'
        $('.loader').toggleClass 'hidden'

        $('#results table tbody').remove() if $('#results table tbody').length > 0
        $('p.no-results').remove() if $('p.no-results').length > 0

        query = @$('#query')
        $(query).prop 'disabled', true
        getPeople query.val()


search = new APIs.Views.Search()