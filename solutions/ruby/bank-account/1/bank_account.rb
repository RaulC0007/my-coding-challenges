class BankAccount
  def initialize
    @balance = nil
    @is_open = false
    # El Mutex protegerá todas nuestras operaciones críticas frente a condiciones de carrera
    @lock = Mutex.new
  end

  def open
    @lock.synchronize do
      raise ArgumentError, "Account is already open" if @is_open
      
      @balance = 0
      @is_open = true
    end
  end

  def close
    @lock.synchronize do
      ensure_opened_account!
      
      @is_open = false
      @balance = nil
    end
  end

  def balance
    @lock.synchronize do
      ensure_opened_account!
      @balance
    end
  end

  def deposit(amount)
    @lock.synchronize do
      ensure_opened_account!
      raise ArgumentError, "Amount must be greater than 0" if amount <= 0

      @balance += amount
    end
  end

  def withdraw(amount)
    @lock.synchronize do
      ensure_opened_account!
      raise ArgumentError, "Amount must be greater than 0" if amount <= 0
      raise ArgumentError, "Cannot withdraw more than available balance" if amount > @balance

      @balance -= amount
    end
  end

  private

  # Método auxiliar para verificar el estado de la cuenta
  def ensure_opened_account!
    raise ArgumentError, "Account is closed or not opened yet" unless @is_open
  end
end